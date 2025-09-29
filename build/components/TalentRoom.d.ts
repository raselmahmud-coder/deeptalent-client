import React from 'react';
import { TalentSession } from '../core/session';
export interface TalentRoomProps {
    session: TalentSession;
    serverUrl: string;
    token: string;
    connectOptions?: any;
    children: React.ReactNode;
}
export declare function TalentRoom({ session, serverUrl, token, connectOptions, children }: TalentRoomProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TalentRoom.d.ts.map