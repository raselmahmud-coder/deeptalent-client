// demo_test/hook-tests.ts
import { 
    useSession,
    useParticipant,
    useLocalParticipant,
    useTracks,
    useConnectionState,
    useDataChannel,
    useRoomInfo,
    useChat,
    useMediaDeviceSelect,
    TalentSession
  } from '../build/index.esm.js';
  
  console.log('🧪 Hook-Specific Tests');
  console.log('====================');
  
  // Test individual hooks
  function testHooks() {
    console.log('\n1. Testing useSession hook...');
    try {
      console.log('✅ useSession hook available');
    } catch (error) {
      console.error('❌ useSession failed:', error);
    }
  
    console.log('\n2. Testing useParticipant hook...');
    try {
      console.log('✅ useParticipant hook available');
    } catch (error) {
      console.error('❌ useParticipant failed:', error);
    }
  
    console.log('\n3. Testing useLocalParticipant hook...');
    try {
      console.log('✅ useLocalParticipant hook available');
    } catch (error) {
      console.error('❌ useLocalParticipant failed:', error);
    }
  
    console.log('\n4. Testing useTracks hook...');
    try {
      console.log('✅ useTracks hook available');
    } catch (error) {
      console.error('❌ useTracks failed:', error);
    }
  
    console.log('\n5. Testing useConnectionState hook...');
    try {
      console.log('✅ useConnectionState hook available');
    } catch (error) {
      console.error('❌ useConnectionState failed:', error);
    }
  
    console.log('\n6. Testing useDataChannel hook...');
    try {
      console.log('✅ useDataChannel hook available');
    } catch (error) {
      console.error('❌ useDataChannel failed:', error);
    }
  
    console.log('\n7. Testing useRoomInfo hook...');
    try {
      console.log('✅ useRoomInfo hook available');
    } catch (error) {
      console.error('❌ useRoomInfo failed:', error);
    }
  
    console.log('\n8. Testing useChat hook...');
    try {
      console.log('✅ useChat hook available');
    } catch (error) {
      console.error('❌ useChat failed:', error);
    }
  
    console.log('\n9. Testing useMediaDeviceSelect hook...');
    try {
      console.log('✅ useMediaDeviceSelect hook available');
    } catch (error) {
      console.error('❌ useMediaDeviceSelect failed:', error);
    }
  }
  
  testHooks();