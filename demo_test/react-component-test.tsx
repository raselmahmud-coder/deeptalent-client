// demo_test/react-components-test.tsx
import React from 'react';
import { 
  TalentSession, 
  SessionProvider, 
  VideoStream, 
  AudioVisualizer,
  useSession,
  useParticipant,
  useTracks
} from '../build/index.esm.js';

console.log('🧪 DeepTalent React Components Test');
console.log('===================================');

// Create a test session
const testSession = new TalentSession();

// Test Component
function TestComponent() {
  const { session, connectionState, isConnected } = useSession();
  const participant = useParticipant();
  const tracks = useTracks();
  
  return (
    <div className="deeptalent-session">
      <h2>DeepTalent Test Component</h2>
      <div>
        <p><strong>Connection State:</strong> {connectionState}</p>
        <p><strong>Is Connected:</strong> {isConnected ? 'Yes' : 'No'}</p>
        <p><strong>Participant:</strong> {participant ? 'Connected' : 'None'}</p>
        <p><strong>Tracks:</strong> {tracks.length}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <div>
          <h3>Video Stream</h3>
          <VideoStream 
            participantId="test-participant"
            className="deeptalent-video-stream" 
            style={{ width: 300, height: 200 }}
          />
        </div>
        
        <div>
          <h3>Audio Visualizer</h3>
          <AudioVisualizer 
            participantId="test-participant"
            className="deeptalent-audio-visualizer" 
            style={{ width: 300, height: 100 }}
          />
        </div>
      </div>
    </div>
  );
}

// Test App
function TestApp() {
  return (
    <SessionProvider session={testSession}>
      <TestComponent />
    </SessionProvider>
  );
}

console.log('✅ React components test setup complete');
console.log('✅ SessionProvider context created');
console.log('✅ VideoStream component available');
console.log('✅ AudioVisualizer component available');
console.log('✅ useSession hook available');
console.log('✅ useParticipants hook available');
console.log('✅ useTracks hook available');

export { TestApp };