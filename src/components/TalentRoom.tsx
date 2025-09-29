// src/components/TalentRoom.tsx
import React from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import { TalentSession } from '../core/session';

export interface TalentRoomProps {
  session: TalentSession;
  serverUrl: string;
  token: string;
  connectOptions?: any;
  children: React.ReactNode;
}

export function TalentRoom({ session, serverUrl, token, connectOptions, children }: TalentRoomProps) {
  return (
    <LiveKitRoom
      serverUrl={serverUrl}
      token={token}
      connectOptions={connectOptions}
    >
      {children}
    </LiveKitRoom>
  );
}