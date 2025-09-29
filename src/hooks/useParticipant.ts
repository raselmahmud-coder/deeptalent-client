// src/hooks/useParticipant.ts
import { useState, useEffect } from 'react';
import { useSessionContext } from '../components/SessionProvider';
import { TalentParticipant } from '../core/types';

export function useParticipant(participantId?: string) {
  const { session } = useSessionContext();
  const [participant, setParticipant] = useState<TalentParticipant | undefined>();

  useEffect(() => {
    if (!session) return;

    const updateParticipant = () => {
      const participants = session.participants;
      const found = participantId 
        ? participants.find((p: TalentParticipant) => p.id === participantId)
        : participants.find((p: TalentParticipant) => p.isLocal);
      setParticipant(found);
    };

    // Initial update
    updateParticipant();

    // Listen for participant changes
    session.on('participantJoined', updateParticipant);
    session.on('participantLeft', updateParticipant);

    return () => {
      session.off('participantJoined', updateParticipant);
      session.off('participantLeft', updateParticipant);
    };
  }, [session, participantId]);

  return participant;
}

export function useParticipants() {
  const { session } = useSessionContext();
  const [participants, setParticipants] = useState<TalentParticipant[]>([]);

  useEffect(() => {
    if (!session) return;

    const updateParticipants = () => {
      setParticipants(session.participants);
    };

    // Initial update
    updateParticipants();

    // Listen for participant changes
    session.on('participantJoined', updateParticipants);
    session.on('participantLeft', updateParticipants);

    return () => {
      session.off('participantJoined', updateParticipants);
      session.off('participantLeft', updateParticipants);
    };
  }, [session]);

  return participants;
}
export function useLocalParticipant(): TalentParticipant | undefined {
  // useParticipant without ID returns local participant
  return useParticipant();
}