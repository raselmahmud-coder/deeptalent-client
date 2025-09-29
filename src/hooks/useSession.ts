// src/hooks/useSession.ts
import { useSessionContext } from '../components/SessionProvider';

export function useSession() {
  const { session, connectionState, isConnected } = useSessionContext();
  
  return {
    session,
    connectionState,
    isConnected,
    connect: session ? session.connect.bind(session) : undefined,
    disconnect: session ? session.disconnect.bind(session) : undefined,
    enableCamera: session ? session.enableCamera.bind(session) : undefined,
    enableMicrophone: session ? session.enableMicrophone.bind(session) : undefined,
    enableScreenShare: session ? session.enableScreenShare.bind(session) : undefined,
    sendMessage: session ? session.sendMessage.bind(session) : undefined,
  };
}