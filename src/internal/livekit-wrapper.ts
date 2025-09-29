// src/internal/livekit-wrapper.ts - Fix type issues
import {
  Room as LiveKitRoom,
  RemoteParticipant,
  LocalParticipant,
  Track,
  ConnectionState as LKConnectionState,
  RoomEvent,
  DisconnectReason
} from 'livekit-client';

import {
  TalentConnectionState,
  TalentParticipant,
  TalentTrack,
  TalentTrackKind,
  TalentTrackSource
} from '../core/types';
import { TalentEventEmitter } from '../core/events';
import { createTypedError } from '../utils/errors';

export class LiveKitSessionAdapter {
  private room: LiveKitRoom;
  private eventEmitter: TalentEventEmitter;

  constructor(eventEmitter: TalentEventEmitter) {
    this.room = new LiveKitRoom();
    this.eventEmitter = eventEmitter;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Connection state changes
    this.room.on(RoomEvent.ConnectionStateChanged, (state: LKConnectionState) => {
      this.eventEmitter.emit('connectionStateChanged', this.mapConnectionState(state));
    });

    // Participant events
    this.room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      this.eventEmitter.emit('participantJoined', this.mapParticipant(participant));
    });

    this.room.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      this.eventEmitter.emit('participantLeft', this.mapParticipant(participant));
    });

    // Track events  
    this.room.on(RoomEvent.TrackPublished, (publication, participant) => {
      if (publication.track) {
        this.eventEmitter.emit('trackPublished', this.mapTrack(publication.track, participant));
      }
    });

    // Data/Chat events
    this.room.on(RoomEvent.DataReceived, (payload: Uint8Array, participant?: RemoteParticipant) => {
      try {
        const message = JSON.parse(new TextDecoder().decode(payload));
        if (message.type === 'chat') {
          this.eventEmitter.emit('chatMessage', {
            from: participant ? this.mapParticipant(participant) : this.mapParticipant(this.room.localParticipant),
            text: message.text,
            timestamp: message.timestamp || Date.now()
          });
        }
      } catch (error) {
        console.warn('Failed to parse data message:', error);
      }
    });

    // Error handling - fix the any type
    this.room.on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
      if (reason) {
        const reasonString = DisconnectReason[reason] || 'Unknown reason';
        this.eventEmitter.emit('error', createTypedError(`Session disconnected: ${reasonString}`));
      }
    });
  }

  async connect(wsUrl: string, token: string): Promise<void> {
    try {
      await this.room.connect(wsUrl, token);
    } catch (error) {
      const talentError = createTypedError(
        error instanceof Error ? error.message : 'Connection failed',
        error
      );
      this.eventEmitter.emit('error', talentError);
      throw talentError;
    }
  }

  async disconnect(): Promise<void> {
    await this.room.disconnect();
  }

  // Enable/disable local tracks
  async enableCamera(enabled: boolean): Promise<void> {
    await this.room.localParticipant.setCameraEnabled(enabled);
  }

  async enableMicrophone(enabled: boolean): Promise<void> {
    await this.room.localParticipant.setMicrophoneEnabled(enabled);
  }

  async enableScreenShare(enabled: boolean): Promise<void> {
    await this.room.localParticipant.setScreenShareEnabled(enabled);
  }

  // Send chat message
  async sendChatMessage(text: string): Promise<void> {
    const message = {
      type: 'chat',
      text,
      timestamp: Date.now()
    };
    const encoder = new TextEncoder();
    await this.room.localParticipant.publishData(encoder.encode(JSON.stringify(message)));
  }

  // Type mappers
  private mapConnectionState(state: LKConnectionState): TalentConnectionState {
    switch (state) {
      case LKConnectionState.Connected:
        return TalentConnectionState.Connected;
      case LKConnectionState.Connecting:
        return TalentConnectionState.Connecting;
      case LKConnectionState.Reconnecting:
        return TalentConnectionState.Reconnecting;
      case LKConnectionState.Disconnected:
        return TalentConnectionState.Disconnected;
      default: return TalentConnectionState.Disconnected;
    }
  }

  private mapParticipant(participant: RemoteParticipant | LocalParticipant): TalentParticipant {
    return {
      id: participant.identity,
      name: participant.name,
      isLocal: participant instanceof LocalParticipant,
      isAgent: participant.metadata?.includes('agent') || false,
      metadata: participant.metadata,
      attributes: participant.attributes
    };
  }

  private mapTrack(track: Track, participant: RemoteParticipant | LocalParticipant): TalentTrack {
    return {
      id: track.sid || `${track.kind}_${Date.now()}`,
      kind: track.kind === Track.Kind.Audio ? TalentTrackKind.Audio : TalentTrackKind.Video,
      source: this.mapTrackSource(track.source),
      participant: this.mapParticipant(participant),
      enabled: !track.isMuted
    };
  }

  private mapTrackSource(source: Track.Source): TalentTrackSource {
    switch (source) {
      case Track.Source.Camera: return TalentTrackSource.Camera;
      case Track.Source.Microphone: return TalentTrackSource.Microphone;
      case Track.Source.ScreenShare: return TalentTrackSource.ScreenShare;
      default: return TalentTrackSource.Unknown;
    }
  }

  // Getters for internal room access (when needed)
  get connectionState(): TalentConnectionState {
    return this.mapConnectionState(this.room.state);
  }

  get participants(): TalentParticipant[] {
    const remoteParticipants = Array.from(this.room.remoteParticipants.values());
    const allParticipants = [...remoteParticipants, this.room.localParticipant];
    return allParticipants.map(p => this.mapParticipant(p));
  }

  // Internal access for React components (hidden from public API)
  get _internalRoom(): LiveKitRoom {
    return this.room;
  }
}