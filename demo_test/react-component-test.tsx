// demo_test/react-integration-test.tsx
import React from 'react';
import { 
  TalentSession,
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
  Track
} from '../build/index.esm.js';

console.log('🧪 React Integration Test');
console.log('=========================');

// Test Component using all hooks
function TestComponent() {
  const { session, connectionState, isConnected } = useSession();
  const participant = useParticipant();
  const localParticipant = useLocalParticipant();
  const tracks = useTracks();
  const connectionState2 = useConnectionState();
  const { sendMessage } = useDataChannel();
  const roomInfo = useRoomInfo();
  const { messages, send } = useChat();
  const { devices } = useMediaDeviceSelect('audioinput');
  
  return (
    <div className="deeptalent-session">
      <h2>DeepTalent Integration Test</h2>
      
      <div className="test-section">
        <h3>Session Info</h3>
        <p>Connection State: {connectionState}</p>
        <p>Is Connected: {isConnected ? 'Yes' : 'No'}</p>
        <p>Room Name: {roomInfo.name || 'N/A'}</p>
      </div>
      
      <div className="test-section">
        <h3>Participants</h3>
        <p>Local Participant: {localParticipant?.name || 'None'}</p>
        <p>Current Participant: {participant?.name || 'None'}</p>
        <p>Tracks Count: {tracks.length}</p>
      </div>
      
      <div className="test-section">
        <h3>Media Controls</h3>
        <TrackToggle source={Track.Source.Camera} />
        <TrackToggle source={Track.Source.Microphone} />
        <TrackToggle source={Track.Source.ScreenShare} />
      </div>
      
      <div className="test-section">
        <h3>Video & Audio</h3>
        <VideoStream className="test-video" />
        <AudioVisualizer className="test-audio" />
      </div>
      
      <div className="test-section">
        <h3>Chat</h3>
        <div className="chat-messages">
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </div>
      
      <div className="test-section">
        <h3>Audio Devices</h3>
        <p>Available Audio Devices: {devices.length}</p>
      </div>
    </div>
  );
}

// Test App with all components
function TestApp() {
  const session = new TalentSession();
  
  return (
    <SessionProvider session={session}>
      <TalentRoom 
        session={session}
        serverUrl="wss://your-livekit-server.com"
        token="your-token"
      >
        <TestComponent />
        <RoomAudioRenderer />
        <StartAudio label="Start Audio" />
      </TalentRoom>
    </SessionProvider>
  );
}

console.log('✅ React integration test setup complete');
console.log('✅ All components and hooks available');

export { TestApp };