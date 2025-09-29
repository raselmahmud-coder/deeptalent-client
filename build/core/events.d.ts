import { TalentSessionEvents } from './types';
export declare class TalentEventEmitter {
    private listeners;
    on<K extends keyof TalentSessionEvents>(event: K, listener: TalentSessionEvents[K]): void;
    off<K extends keyof TalentSessionEvents>(event: K, listener: TalentSessionEvents[K]): void;
    emit<K extends keyof TalentSessionEvents>(event: K, ...args: Parameters<TalentSessionEvents[K]>): void;
    removeAllListeners(): void;
}
//# sourceMappingURL=events.d.ts.map