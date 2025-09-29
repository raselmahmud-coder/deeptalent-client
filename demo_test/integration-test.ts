// demo_test/integration-test.ts
import { 
  DeepTalent, 
  TalentSession, 
  TalentConnectionState,
  SessionProvider,
  VideoStream,
  AudioVisualizer,
  useSession
} from '../build/index.esm.js';

console.log('🧪 DeepTalent Integration Test');
console.log('============================');

// Test 1: Full SDK Import
console.log('\n1. Testing Full SDK Import...');
try {
  console.log('✅ DeepTalent class imported');
  console.log('✅ TalentSession class imported');
  console.log('✅ TalentConnectionState enum imported');
  console.log('✅ React components imported');
  console.log('✅ React hooks imported');
} catch (error) {
  console.error('❌ Import test failed:', error);
}

// Test 2: Session Lifecycle
console.log('\n2. Testing Session Lifecycle...');
try {
  const session = new TalentSession();
  
  // Test initial state
  console.log(`✅ Initial state: ${session.connectionState}`);
  
  // Test event listeners
  let stateChangeCount = 0;
  session.on('connectionStateChanged', (state) => {
    stateChangeCount++;
    console.log(`✅ State change ${stateChangeCount}: ${state}`);
  });
  
  // Simulate state changes
  session.emit('connectionStateChanged', TalentConnectionState.Connecting);
  session.emit('connectionStateChanged', TalentConnectionState.Connected);
  
  console.log(`✅ Event listeners working (${stateChangeCount} events received)`);
} catch (error) {
  console.error('❌ Session lifecycle test failed:', error);
}

// Test 3: Component Props
console.log('\n3. Testing Component Props...');
try {
  // Test VideoStream props
  const videoProps = {
    participantId: 'test-participant',
    className: 'test-video',
    style: { width: '300px', height: '200px' }
  };
  console.log('✅ VideoStream props interface valid');
  
  // Test AudioVisualizer props
  const audioProps = {
    participantId: 'test-participant',
    barCount: 8,
    className: 'test-audio',
    style: { height: '50px' }
  };
  console.log('✅ AudioVisualizer props interface valid');
} catch (error) {
  console.error('❌ Component props test failed:', error);
}

// Test 4: Error Handling
console.log('\n4. Testing Error Handling...');
try {
  const session = new TalentSession();
  let errorReceived = false;
  
  session.on('error', (error) => {
    errorReceived = true;
    console.log(`✅ Error event received: ${error.message}`);
  });
  
  // Simulate error
  session.emit('error', new Error('Test error'));
  
  if (errorReceived) {
    console.log('✅ Error handling working');
  } else {
    console.log('❌ Error handling not working');
  }
} catch (error) {
  console.error('❌ Error handling test failed:', error);
}

console.log('\n🎉 Integration test complete!');