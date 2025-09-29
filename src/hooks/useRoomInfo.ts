// src/hooks/useRoomInfo.ts
import { useSessionContext } from '../components/SessionProvider';
import { useEffect, useState } from 'react';

export interface RoomInfo {
  name?: string;
  metadata?: string;
}

export function useRoomInfo(): RoomInfo {
  const { session } = useSessionContext();
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({});

  useEffect(() => {
    if (!session?._internal) return;
    
    const room = session._internal;
    setRoomInfo({
      name: room.name,
      metadata: room.metadata,
    });
  }, [session]);

  return roomInfo;
}