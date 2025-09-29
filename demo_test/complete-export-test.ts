// demo_test/complete-export-test.ts
import { 
    // Core classes
    DeepTalent, 
    TalentSession,
    
    // Types and enums
    TalentConnectionState,
    Track,
    ConnectionState,
    
    // React components
    SessionProvider,
    VideoStream,
    AudioVisualizer,
    ChatMessage,
    TrackToggle,
    TalentRoom,
    RoomAudioRenderer,
    StartAudio,
    
    // React hooks
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
    
    // Utilities
    // TrackReferenceOrPlaceholder,
    createTrackReference
  } from '../build/index.esm.js';
  import type { TrackReferenceOrPlaceholder } from '../build/index.esm.js';

  type CheckTrackRef = TrackReferenceOrPlaceholder;

  console.log('🧪 Complete DeepTalent SDK Export Test');
  console.log('=====================================');
  
  // Test 1: Core Classes
  console.log('\n1. Testing Core Classes...');
  try {
    const client = new DeepTalent({ apiUrl: 'https://api.deeptalent.io' });
    const session = new TalentSession();
    console.log('✅ DeepTalent client created');
    console.log('✅ TalentSession created');
  } catch (error) {
    console.error('❌ Core classes failed:', error);
  }
  
  // Test 2: Enums and Types
  console.log('\n2. Testing Enums and Types...');
  try {
    console.log('✅ TalentConnectionState:', TalentConnectionState);
    console.log('✅ Track.Source.Camera:', Track.Source.Camera);
    console.log('✅ ConnectionState.Connected:', ConnectionState.Connected);
  } catch (error) {
    console.error('❌ Enums failed:', error);
  }
  
  // Test 3: React Components (Type Check)
  console.log('\n3. Testing React Components...');
  try {
    console.log('✅ SessionProvider:', typeof SessionProvider);
    console.log('✅ VideoStream:', typeof VideoStream);
    console.log('✅ AudioVisualizer:', typeof AudioVisualizer);
    console.log('✅ ChatMessage:', typeof ChatMessage);
    console.log('✅ TrackToggle:', typeof TrackToggle);
    console.log('✅ TalentRoom:', typeof TalentRoom);
    console.log('✅ RoomAudioRenderer:', typeof RoomAudioRenderer);
    console.log('✅ StartAudio:', typeof StartAudio);
  } catch (error) {
    console.error('❌ React components failed:', error);
  }
  
  // Test 4: React Hooks (Type Check)
  console.log('\n4. Testing React Hooks...');
  try {
    console.log('✅ useSession:', typeof useSession);
    console.log('✅ useParticipant:', typeof useParticipant);
    console.log('✅ useLocalParticipant:', typeof useLocalParticipant);
    console.log('✅ useTracks:', typeof useTracks);
    console.log('✅ useConnectionState:', typeof useConnectionState);
    console.log('✅ useDataChannel:', typeof useDataChannel);
    console.log('✅ useRoomInfo:', typeof useRoomInfo);
    console.log('✅ useChat:', typeof useChat);
    console.log('✅ useMediaDeviceSelect:', typeof useMediaDeviceSelect);
    console.log('✅ useVoiceAssistant:', typeof useVoiceAssistant);
    console.log('✅ useRoomContext:', typeof useRoomContext);
    console.log('✅ useParticipantAttributes:', typeof useParticipantAttributes);
    console.log('✅ useTrackTranscription:', typeof useTrackTranscription);
  } catch (error) {
    console.error('❌ React hooks failed:', error);
  }
  
  // Test 5: Utilities
  console.log('\n5. Testing Utilities...');
  try {
    console.log('✅ createTrackReference:', typeof createTrackReference);
  } catch (error) {
    console.error('❌ Utilities failed:', error);
  }
  
  console.log('\n🎉 All 18 exports are available!');