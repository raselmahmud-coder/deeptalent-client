## Deeptalent Client SDK Overview

### Install

```bash
pnpm add deeptalent-client
# or
npm install deeptalent-client
```

### Import Summary

- `DeepTalent`, `TalentSession`, `TalentConnectionState`
- React components: `SessionProvider`, `VideoStream`, `AudioVisualizer`, `ChatMessage`, `TrackToggle`, `TalentRoom`, `RoomAudioRenderer`, `StartAudio`
- React hooks: `useSession`, `useParticipant`, `useLocalParticipant`, `useTracks`, `useConnectionState`, `useDataChannel`, `useRoomInfo`, `useChat`, `useMediaDeviceSelect`, `useVoiceAssistant`, `useRoomContext`, `useParticipantAttributes`, `useTrackTranscription`
- Utilities: `createTrackReference`
- Types: `TalentSessionConfig`, `TalentConnectionOptions`, `TalentParticipant`, `TalentTrack`, `TalentSessionEvents`, `TranscriptionSegment`, `LocalAudioTrack`, `LocalVideoTrack`, `RoomConfiguration`, `RoomAgentDispatch`, `TrackReference`, `TrackReferenceOrPlaceholder`, `Track`, `ConnectionState`, `LocalParticipant`, `Participant`

```29:38:src/index.ts
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
```

### Top-Level Usage

```tsx
import React from 'react';
import {
  DeepTalent,
  TalentSession,
  TalentConnectionState,
  SessionProvider,
  VideoStream,
  AudioVisualizer,
  ChatMessage,
  TrackToggle,
  TalentRoom,
  RoomAudioRenderer,
  StartAudio,
  useSession,
  useParticipant,
  useLocalParticipant,
  useTracks,
  useConnectionState,
  useDataChannel,
  useRoomInfo,
  useChat,
  useMediaDeviceSelect,
  useVoiceAssistant,
  useRoomContext,
  useParticipantAttributes,
  useTrackTranscription,
  createTrackReference,
  type TrackReference,
  type TrackReferenceOrPlaceholder
} from 'deeptalent-client';
import 'deeptalent-client/build/styles.css';
```

### Core Workflow Example

```tsx
const session = new TalentSession();

function Dashboard() {
  const { connectionState, isConnected, sendMessage } = useSession();
  const localParticipant = useLocalParticipant();
  const tracks = useTracks();
  const { messages } = useChat();

  return (
    <div className="deeptalent-session">
      <h2>State: {connectionState}</h2>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      <p>Local user: {localParticipant?.name ?? 'Anonymous'}</p>
      <p>Tracks: {tracks.length}</p>

      <TrackToggle source="camera" />
      <TrackToggle source="microphone" />

      <VideoStream participantId={localParticipant?.id} />
      <AudioVisualizer participantId={localParticipant?.id} />

      {messages.map(msg => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}

export function App() {
  return (
    <TalentRoom session={session} serverUrl="wss://your-livekit-server" token="TOKEN">
      <SessionProvider session={session}>
        <Dashboard />
        <RoomAudioRenderer />
        <StartAudio />
      </SessionProvider>
    </TalentRoom>
  );
}
```

### Hooks Reference

| Hook | Purpose |
| --- | --- |
| `useSession` | exposes session object plus helpers (connect, toggle media, send chat) |
| `useParticipant` / `useLocalParticipant` / `useParticipants` | access remote/local participant metadata |
| `useTracks` | real-time track list driven by `trackPublished` / `trackUnpublished` |
| `useConnectionState` | observe room connection state |
| `useDataChannel` | send data channel payloads (string or `Uint8Array`) |
| `useRoomInfo` | room name + metadata |
| `useChat` | chat messages array + send helper |
| `useMediaDeviceSelect` | enumerate audio/video devices, track active selection |
| `useVoiceAssistant`, `useRoomContext`, `useParticipantAttributes`, `useTrackTranscription` | re-exported from LiveKit for advanced scenarios |

### Utilities & Types

```23:78:src/core/types.ts
export interface TrackReference {
  participant: RemoteParticipant | LocalParticipant;
  source: Track.Source;
  publication?: any;
}
export function createTrackReference(
  participant: RemoteParticipant | LocalParticipant,
  source: Track.Source,
  trackType: 'audio' | 'video'
): TrackReference { /* ... */ }
```

Use `createTrackReference` when you need to pass LiveKit-compatible track references to components like `VideoStream` or `BarVisualizer`.
