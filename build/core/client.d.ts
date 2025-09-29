import { TalentSession } from './session';
import { TalentSessionConfig, TalentConnectionOptions } from './types';
export declare class DeepTalent {
    private apiUrl;
    constructor(config?: {
        apiUrl?: string;
    });
    /**
     * Create a new talent session
     */
    createSession(): TalentSession;
    /**
     * Create session with server-side token generation
     */
    createSessionWithAuth(config: TalentSessionConfig): Promise<{
        session: TalentSession;
        connectionOptions: TalentConnectionOptions;
    }>;
    /**
     * Static factory method for quick setup
     */
    static connect(config: TalentSessionConfig & {
        apiUrl?: string;
        autoConnect?: boolean;
    }): Promise<TalentSession>;
}
//# sourceMappingURL=client.d.ts.map