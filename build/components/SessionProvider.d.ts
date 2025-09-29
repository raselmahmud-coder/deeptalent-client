import React from 'react';
import { TalentConnectionState } from '../core/types';
import { TalentSession } from '../core/session';
interface SessionContextValue {
    session: TalentSession | null;
    connectionState: TalentConnectionState;
    isConnected: boolean;
}
export interface SessionProviderProps {
    children: React.ReactNode;
    session: TalentSession;
}
export declare function SessionProvider({ children, session }: SessionProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useSessionContext(): SessionContextValue;
export {};
//# sourceMappingURL=SessionProvider.d.ts.map