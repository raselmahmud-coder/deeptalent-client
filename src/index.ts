// Core exports
export { TalentSession } from './core/session';
export { DeepTalent } from './core/client';

// Types
export type {
  TalentSessionConfig,
  TalentConnectionOptions,
  TalentParticipant,
  TalentTrack,
  TalentSessionEvents
} from './core/types';

// Export TalentConnectionState as both type and value
export { TalentConnectionState } from './core/types';

// Track reference types
export type { TrackReference } from './core/types';
export { createTrackReference } from './core/types';

// React components
export {
  SessionProvider,
  VideoStream,
  AudioVisualizer
} from './components';

// React hooks
export {
  useSession,
  useParticipant,
  useTracks
} from './hooks';
