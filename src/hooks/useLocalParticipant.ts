// src/hooks/useLocalParticipant.ts
import { useParticipant } from './useParticipant';
import { TalentParticipant } from '../core/types';

export function useLocalParticipant(): TalentParticipant | undefined {
  // useParticipant without ID returns local participant
  return useParticipant();
}