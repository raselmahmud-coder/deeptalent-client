// Core exports
export { TalentSession } from './core/session';
export { DeepTalent } from './core/client';

// Types
export type {
  TalentSessionConfig,
  TalentConnectionOptions,
  TalentParticipant,
  TalentTrack,
  TalentSessionEvents,
  TranscriptionSegment,
  LocalAudioTrack,
  LocalVideoTrack,
  RoomConfiguration,
  RoomAgentDispatch
} from './core/types';

// Export TalentConnectionState as both type and value
export { TalentConnectionState } from './core/types';

// Track reference types
export type { TrackReference } from './core/types';
export { createTrackReference } from './core/types';
export { Track, ConnectionState } from 'livekit-client';
export type { LocalParticipant, Participant } from 'livekit-client';

// React components
export {
  SessionProvider,
  VideoStream,
  AudioVisualizer,
  ChatMessage,
  TrackToggle,
  TalentRoom,
  RoomAudioRenderer,
  StartAudio
} from './components';

// React hooks
export {
  useSession,
  useParticipant,
  useLocalParticipant,
  useTracks,
  useConnectionState,
  useDataChannel,
  useRoomInfo,
  useChat,
  useMediaDeviceSelect,
  // These need LiveKit context, so alias them
  useVoiceAssistant,
  useRoomContext,
  useParticipantAttributes,
  useTrackTranscription
} from './hooks';


// Export utility for TrackReferenceOrPlaceholder
export type { TrackReferenceOrPlaceholder } from '@livekit/components-core';