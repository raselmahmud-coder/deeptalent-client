// demo_test/basic-sdk-test.ts
import { DeepTalent, TalentSession,  TalentConnectionState} from '../build/index.esm.js';


console.log('🧪 DeepTalent SDK Basic Test');
console.log('============================');

// Test 1: Client Creation
console.log('\n1. Testing DeepTalent Client Creation...');
try {
  const client = new DeepTalent({ apiUrl: 'https://api.deeptalent.io' });
  console.log('✅ DeepTalent client created successfully');
  console.log(`   - API URL: ${client['apiUrl'] || 'default'}`);
} catch (error) {
  console.error('❌ Client creation failed:', error);
}

// Test 2: Session Creation
console.log('\n2. Testing TalentSession Creation...');
try {
  const session = new TalentSession();
  console.log('✅ TalentSession created successfully');
  console.log(`   - Initial state: ${session.connectionState}`);
  console.log(`   - Participants: ${session.participants.length}`);
  console.log(`   - Tracks: ${session.tracks.length}`);
} catch (error) {
  console.error('❌ Session creation failed:', error);
}

// Test 3: Event System
console.log('\n3. Testing Event System...');
try {
  const session = new TalentSession();
  let eventReceived = false;
  
  session.on('connectionStateChanged', (state) => {
    eventReceived = true;
    console.log(`✅ Event received - connection state: ${state}`);
  });
  
  // Trigger event manually
  session.emit('connectionStateChanged', TalentConnectionState.Connecting);
  
  if (eventReceived) {
    console.log('✅ Event system working correctly');
  } else {
    console.log('❌ Event system not working');
  }
} catch (error) {
  console.error('❌ Event system test failed:', error);
}

// Test 4: Session Methods
console.log('\n4. Testing Session Methods...');
try {
  const session = new TalentSession();
  
  // Test method availability
  const methods = [
    'connect', 'disconnect', 'enableCamera', 
    'enableMicrophone', 'enableScreenShare', 'sendMessage'
  ];
  
  methods.forEach(method => {
    if (typeof session[method] === 'function') {
      console.log(`✅ Method ${method} is available`);
    } else {
      console.log(`❌ Method ${method} is missing`);
    }
  });
} catch (error) {
  console.error('❌ Session methods test failed:', error);
}

console.log('\n🎉 Basic SDK test complete!');