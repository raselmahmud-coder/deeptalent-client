// src/components/ChatMessage.tsx

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

export function ChatMessage({ message, className }: ChatMessageProps) {
  return (
    <div className={`deeptalent-chat-message ${className || ''}`}>
      <div className="deeptalent-chat-message-header">
        <span className="deeptalent-chat-message-sender">
          {message.from?.name || message.from?.id || 'Unknown'}
        </span>
        <span className="deeptalent-chat-message-time">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <div className="deeptalent-chat-message-content">
        {message.message}
      </div>
    </div>
  );
}