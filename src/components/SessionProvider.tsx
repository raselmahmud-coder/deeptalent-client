// src/components/SessionProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { TalentConnectionState } from '../core/types';
import { TalentSession } from '../core/session';

interface SessionContextValue {
  session: TalentSession | null;
  connectionState: TalentConnectionState;
  isConnected: boolean;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export interface SessionProviderProps {
  children: React.ReactNode;
  session: TalentSession;
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  const [connectionState, setConnectionState] = useState<TalentConnectionState>(
    session.connectionState
  );

  useEffect(() => {
    const handleStateChange = (state: TalentConnectionState) => {
      setConnectionState(state);
    };

    session.on('connectionStateChanged', handleStateChange);
    
    return () => {
      session.off('connectionStateChanged', handleStateChange);
    };
  }, [session]);

  const value: SessionContextValue = {
    session,
    connectionState,
    isConnected: connectionState === TalentConnectionState.Connected
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
}