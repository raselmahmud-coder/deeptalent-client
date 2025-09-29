import { Room as LiveKitRoom } from 'livekit-client';
import { TalentConnectionState, TalentParticipant } from '../core/types';
import { TalentEventEmitter } from '../core/events';
export declare class LiveKitSessionAdapter {
    private room;
    private eventEmitter;
    constructor(eventEmitter: TalentEventEmitter);
    private setupEventListeners;
    connect(wsUrl: string, token: string): Promise<void>;
    disconnect(): Promise<void>;
    enableCamera(enabled: boolean): Promise<void>;
    enableMicrophone(enabled: boolean): Promise<void>;
    enableScreenShare(enabled: boolean): Promise<void>;
    sendChatMessage(text: string): Promise<void>;
    private mapConnectionState;
    private mapParticipant;
    private mapTrack;
    private mapTrackSource;
    get connectionState(): TalentConnectionState;
    get participants(): TalentParticipant[];
    get _internalRoom(): LiveKitRoom;
}
//# sourceMappingURL=livekit-wrapper.d.ts.map