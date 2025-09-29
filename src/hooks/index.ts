// src/hooks/index.ts
export { useSession } from './useSession';
export { useParticipant, useParticipants } from './useParticipant';

// Create useTracks hook as mentioned in index.ts
import { useState, useEffect } from 'react';
import { useSessionContext } from '../components/SessionProvider';
import { TalentTrack } from '../core/types';

export function useTracks() {
  const { session } = useSessionContext();
  const [tracks, setTracks] = useState<TalentTrack[]>([]);

  useEffect(() => {
    if (!session) return;

    const updateTracks = () => {
      // Note: You'll need to implement track tracking in your session
      // For now, return empty array
      setTracks([]);
    };

    updateTracks();

    session.on('trackPublished', updateTracks);
    session.on('trackUnpublished', updateTracks);

    return () => {
      session.off('trackPublished', updateTracks);
      session.off('trackUnpublished', updateTracks);
    };
  }, [session]);

  return tracks;
}