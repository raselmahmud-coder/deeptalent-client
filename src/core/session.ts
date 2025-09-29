import { TalentEventEmitter } from './events';
import { LiveKitSessionAdapter } from '../internal/livekit-wrapper';
import { 
  TalentConnectionOptions, 
  TalentConnectionState, 
  TalentParticipant,
  TalentSessionEvents, 
  TalentTrack
} from './types';

export class TalentSession extends TalentEventEmitter {
  private adapter: LiveKitSessionAdapter;
  private _connectionState: TalentConnectionState = TalentConnectionState.Disconnected;
  private _tracks: TalentTrack[] = [];
  get tracks(): TalentTrack[] {
    return [...this._tracks];
  }

  constructor() {
    super();
    this.adapter = new LiveKitSessionAdapter(this);

    // Listen to our own track events to maintain track list
    this.on('trackPublished', (track) => {
      this._tracks.push(track);
    });
    
    this.on('trackUnpublished', (track) => {
      this._tracks = this._tracks.filter(t => t.id !== track.id);
    });
  }

  async connect(options: TalentConnectionOptions): Promise<void> {
    await this.adapter.connect(options.wsUrl, options.token);
  }

  async disconnect(): Promise<void> {
    await this.adapter.disconnect();
  }

  get connectionState(): TalentConnectionState {
    return this.adapter.connectionState;
  }

  get participants(): TalentParticipant[] {
    return this.adapter.participants;
  }

  // Media controls
  async enableCamera(enabled: boolean = true): Promise<void> {
    await this.adapter.enableCamera(enabled);
  }

  async enableMicrophone(enabled: boolean = true): Promise<void> {
    await this.adapter.enableMicrophone(enabled);
  }

  async enableScreenShare(enabled: boolean = true): Promise<void> {
    await this.adapter.enableScreenShare(enabled);
  }

  // Communication
  async sendMessage(text: string): Promise<void> {
    await this.adapter.sendChatMessage(text);
  }

  // Internal access for React components
  get _internal() {
    return this.adapter._internalRoom;
  }
}