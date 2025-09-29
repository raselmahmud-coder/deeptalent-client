import { Track, RemoteParticipant, LocalParticipant } from 'livekit-client';
// Public DeepTalent types - no LiveKit references
export interface TalentSessionConfig {
  apiUrl?: string;
  sessionId?: string;
  participantName?: string;
  participantId?: string;
  features?: {
    audio?: boolean;
    video?: boolean;
    chat?: boolean;
    screenShare?: boolean;
  };
}

export interface TalentConnectionOptions {
  wsUrl: string;
  token: string;
  autoConnect?: boolean;
}

export enum TalentConnectionState {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Connected = 'connected',
  Reconnecting = 'reconnecting',
  Disconnecting = 'disconnecting'
}

export enum TalentTrackKind {
  Audio = 'audio',
  Video = 'video'
}

export enum TalentTrackSource {
  Camera = 'camera',
  Microphone = 'microphone',
  ScreenShare = 'screen_share',
  Unknown = 'unknown'
}

export interface TalentTrackReference {
  participant: any; // Will be refined
  source: Track.Source | string;
  publication?: any;
}

export interface TalentParticipant {
  id: string;
  name?: string;
  isLocal: boolean;
  isAgent: boolean;
  metadata?: string;
  attributes?: Record<string, string>;
}

export interface TalentTrack {
  id: string;
  kind: TalentTrackKind;
  source: TalentTrackSource;
  participant: TalentParticipant;
  enabled: boolean;
}

// Event types
export interface TalentSessionEvents {
  'connectionStateChanged': (state: TalentConnectionState) => void;
  'participantJoined': (participant: TalentParticipant) => void;
  'participantLeft': (participant: TalentParticipant) => void;
  'trackPublished': (track: TalentTrack) => void;
  'trackUnpublished': (track: TalentTrack) => void;
  'chatMessage': (message: { from: TalentParticipant; text: string; timestamp: number }) => void;
  'error': (error: Error) => void;
}

export interface TrackReference {
  participant: RemoteParticipant | LocalParticipant;
  source: Track.Source;
  publication?: any;
}

// Helper function to create track reference
export function createTrackReference(
  participant: RemoteParticipant | LocalParticipant,
  source: Track.Source,
  trackType: 'audio' | 'video'
): TrackReference {
  let publications: any[] = [];

  if (trackType === 'audio') {
    // Use spread operator to avoid Array.from type issues
    publications = [...participant.audioTrackPublications.values()];
  } else {
    publications = [...participant.videoTrackPublications.values()];
  }

  const publication = publications.find(pub => pub.track);

  return {
    participant,
    source,
    publication
  };
}

export interface TranscriptionSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  final: boolean;
  language?: string;
  participant?: TalentParticipant;
}

export interface LocalAudioTrack extends TalentTrack {
  setMuted(muted: boolean): void;
  setVolume(volume: number): void;
}

export interface LocalVideoTrack extends TalentTrack {
  setMuted(muted: boolean): void;
  setQuality(quality: string): void;
}

// Protocol types
export interface RoomConfiguration {
  name?: string;
  emptyTimeout?: number;
  maxParticipants?: number;
  metadata?: string;
}

export interface RoomAgentDispatch {
  agentName: string;
  metadata?: string;
}