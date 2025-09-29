import { TalentEventEmitter } from './events';
import { TalentConnectionOptions, TalentConnectionState, TalentParticipant, TalentTrack } from './types';
export declare class TalentSession extends TalentEventEmitter {
    private adapter;
    private _connectionState;
    private _tracks;
    get tracks(): TalentTrack[];
    constructor();
    connect(options: TalentConnectionOptions): Promise<void>;
    disconnect(): Promise<void>;
    get connectionState(): TalentConnectionState;
    get participants(): TalentParticipant[];
    enableCamera(enabled?: boolean): Promise<void>;
    enableMicrophone(enabled?: boolean): Promise<void>;
    enableScreenShare(enabled?: boolean): Promise<void>;
    sendMessage(text: string): Promise<void>;
    get _internal(): import("livekit-client").Room;
}
//# sourceMappingURL=session.d.ts.map