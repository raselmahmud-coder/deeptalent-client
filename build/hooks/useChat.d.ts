import { TalentParticipant } from '../core/types';
export interface ChatMessage {
    id: string;
    message: string;
    from?: TalentParticipant;
    timestamp: number;
}
export declare function useChat(): {
    messages: ChatMessage[];
    send: (message: string) => Promise<void>;
};
//# sourceMappingURL=useChat.d.ts.map