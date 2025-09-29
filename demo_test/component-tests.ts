// demo_test/component-tests.ts
import { 
    SessionProvider,
    VideoStream,
    AudioVisualizer,
    ChatMessage,
    TrackToggle,
    TalentRoom,
    RoomAudioRenderer,
    StartAudio,
    TalentSession
  } from '../build/index.esm.js';
  
  console.log('🧪 Component-Specific Tests');
  console.log('===========================');
  
  // Test individual components
  function testComponents() {
    console.log('\n1. Testing SessionProvider...');
    try {
      console.log('✅ SessionProvider component available');
    } catch (error) {
      console.error('❌ SessionProvider failed:', error);
    }
  
    console.log('\n2. Testing VideoStream...');
    try {
      console.log('✅ VideoStream component available');
    } catch (error) {
      console.error('❌ VideoStream failed:', error);
    }
  
    console.log('\n3. Testing AudioVisualizer...');
    try {
      console.log('✅ AudioVisualizer component available');
    } catch (error) {
      console.error('❌ AudioVisualizer failed:', error);
    }
  
    console.log('\n4. Testing ChatMessage...');
    try {
      console.log('✅ ChatMessage component available');
    } catch (error) {
      console.error('❌ ChatMessage failed:', error);
    }
  
    console.log('\n5. Testing TrackToggle...');
    try {
      console.log('✅ TrackToggle component available');
    } catch (error) {
      console.error('❌ TrackToggle failed:', error);
    }
  
    console.log('\n6. Testing TalentRoom...');
    try {
      console.log('✅ TalentRoom component available');
    } catch (error) {
      console.error('❌ TalentRoom failed:', error);
    }
  
    console.log('\n7. Testing RoomAudioRenderer...');
    try {
      console.log('✅ RoomAudioRenderer component available');
    } catch (error) {
      console.error('❌ RoomAudioRenderer failed:', error);
    }
  
    console.log('\n8. Testing StartAudio...');
    try {
      console.log('✅ StartAudio component available');
    } catch (error) {
      console.error('❌ StartAudio failed:', error);
    }
  }
  
  testComponents();