export interface ChatMessageProps {
    message: {
        id: string;
        message: string;
        from?: {
            id: string;
            name?: string;
            isLocal: boolean;
        };
        timestamp: number;
    };
    className?: string;
}
export declare function ChatMessage({ message, className }: ChatMessageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatMessage.d.ts.map