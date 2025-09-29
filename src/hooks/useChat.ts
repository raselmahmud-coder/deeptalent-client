// src/hooks/useChat.ts  
import { useState, useEffect, useCallback } from 'react';
import { useSessionContext } from '../components/SessionProvider';
import { TalentParticipant } from '../core/types';

export interface ChatMessage {
  id: string;
  message: string;
  from?: TalentParticipant;
  timestamp: number;
}

export function useChat() {
  const { session } = useSessionContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!session) return;

    const handleChatMessage = (msg: any) => {
      const newMessage: ChatMessage = {
        id: `${msg.timestamp}-${Math.random()}`,
        message: msg.text,
        from: msg.from,
        timestamp: msg.timestamp
      };
      setMessages(prev => [...prev, newMessage]);
    };

    session.on('chatMessage', handleChatMessage);
    return () => {
      session.off('chatMessage', handleChatMessage);
    };
  }, [session]);

  const send = useCallback(async (message: string) => {
    if (!session) return;
    await session.sendMessage(message);
  }, [session]);

  return { messages, send };
}