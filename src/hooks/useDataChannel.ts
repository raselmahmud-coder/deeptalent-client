// src/hooks/useDataChannel.ts
import { useSessionContext } from '../components/SessionProvider';
import { useCallback } from 'react';

export function useDataChannel() {
  const { session } = useSessionContext();

  const sendMessage = useCallback(async (data: string | Uint8Array) => {
    if (!session?._internal) return;
    
    const payload = typeof data === 'string' 
      ? new TextEncoder().encode(data)
      : data;
      
    await session._internal.localParticipant.publishData(payload);
  }, [session]);

  return { sendMessage };
}