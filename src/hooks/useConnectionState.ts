// src/hooks/useConnectionState.ts
import { useSessionContext } from '../components/SessionProvider';

export function useConnectionState() {
  const { connectionState } = useSessionContext();
  return connectionState;
}