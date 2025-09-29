// demo_test/individual-tests.ts
import { DeepTalent, TalentSession, TalentConnectionState } from '../build/index.esm.js';

console.log('🧪 Individual Component Tests');
console.log('============================');

// Test 1: DeepTalent Client Only
console.log('\n1. Testing DeepTalent Client...');
try {
  const client = new DeepTalent({ apiUrl: 'https://api.deeptalent.io' });
  console.log('✅ DeepTalent client works');
} catch (error) {
  console.error('❌ DeepTalent client failed:', error);
}

// Test 2: TalentSession Only
console.log('\n2. Testing TalentSession...');
try {
  const session = new TalentSession();
  console.log('✅ TalentSession works');
  console.log(`   State: ${session.connectionState}`);
} catch (error) {
  console.error('❌ TalentSession failed:', error);
}

// Test 3: TalentConnectionState Only
console.log('\n3. Testing TalentConnectionState...');
try {
  console.log('✅ TalentConnectionState values:');
  console.log(`   Disconnected: ${TalentConnectionState.Disconnected}`);
  console.log(`   Connecting: ${TalentConnectionState.Connecting}`);
  console.log(`   Connected: ${TalentConnectionState.Connected}`);
} catch (error) {
  console.error('❌ TalentConnectionState failed:', error);
}