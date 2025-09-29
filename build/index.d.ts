import * as livekit_client from 'livekit-client';
import { RemoteParticipant, LocalParticipant, Track } from 'livekit-client';
import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface TalentSessionConfig {
    apiUrl?: string;
    sessionId?: string;
    participantName?: string;
    participantId?: string;
    features?: {
        audio?: boolean;
        video?: boolean;
        chat?: boolean;
        screenShare?: boolean;
    };
}
interface TalentConnectionOptions {
    wsUrl: string;
    token: string;
    autoConnect?: boolean;
}
declare enum TalentConnectionState {
    Disconnected = "disconnected",
    Connecting = "connecting",
    Connected = "connected",
    Reconnecting = "reconnecting",
    Disconnecting = "disconnecting"
}
declare enum TalentTrackKind {
    Audio = "audio",
    Video = "video"
}
declare enum TalentTrackSource {
    Camera = "camera",
    Microphone = "microphone",
    ScreenShare = "screen_share",
    Unknown = "unknown"
}
interface TalentParticipant {
    id: string;
    name?: string;
    isLocal: boolean;
    isAgent: boolean;
    metadata?: string;
    attributes?: Record<string, string>;
}
interface TalentTrack {
    id: string;
    kind: TalentTrackKind;
    source: TalentTrackSource;
    participant: TalentParticipant;
    enabled: boolean;
}
interface TalentSessionEvents {
    'connectionStateChanged': (state: TalentConnectionState) => void;
    'participantJoined': (participant: TalentParticipant) => void;
    'participantLeft': (participant: TalentParticipant) => void;
    'trackPublished': (track: TalentTrack) => void;
    'trackUnpublished': (track: TalentTrack) => void;
    'chatMessage': (message: {
        from: TalentParticipant;
        text: string;
        timestamp: number;
    }) => void;
    'error': (error: Error) => void;
}
interface TrackReference {
    participant: RemoteParticipant | LocalParticipant;
    source: Track.Source;
    publication?: any;
}
declare function createTrackReference(participant: RemoteParticipant | LocalParticipant, source: Track.Source, trackType: 'audio' | 'video'): TrackReference;

declare class TalentEventEmitter {
    private listeners;
    on<K extends keyof TalentSessionEvents>(event: K, listener: TalentSessionEvents[K]): void;
    off<K extends keyof TalentSessionEvents>(event: K, listener: TalentSessionEvents[K]): void;
    emit<K extends keyof TalentSessionEvents>(event: K, ...args: Parameters<TalentSessionEvents[K]>): void;
    removeAllListeners(): void;
}

declare class TalentSession extends TalentEventEmitter {
    private adapter;
    private _connectionState;
    private _tracks;
    get tracks(): TalentTrack[];
    constructor();
    connect(options: TalentConnectionOptions): Promise<void>;
    disconnect(): Promise<void>;
    get connectionState(): TalentConnectionState;
    get participants(): TalentParticipant[];
    enableCamera(enabled?: boolean): Promise<void>;
    enableMicrophone(enabled?: boolean): Promise<void>;
    enableScreenShare(enabled?: boolean): Promise<void>;
    sendMessage(text: string): Promise<void>;
    get _internal(): livekit_client.Room;
}

declare class DeepTalent {
    private apiUrl;
    constructor(config?: {
        apiUrl?: string;
    });
    /**
     * Create a new talent session
     */
    createSession(): TalentSession;
    /**
     * Create session with server-side token generation
     */
    createSessionWithAuth(config: TalentSessionConfig): Promise<{
        session: TalentSession;
        connectionOptions: TalentConnectionOptions;
    }>;
    /**
     * Static factory method for quick setup
     */
    static connect(config: TalentSessionConfig & {
        apiUrl?: string;
        autoConnect?: boolean;
    }): Promise<TalentSession>;
}

interface SessionProviderProps {
    children: React.ReactNode;
    session: TalentSession;
}
declare function SessionProvider({ children, session }: SessionProviderProps): react_jsx_runtime.JSX.Element;

interface VideoStreamProps {
    participantId?: string;
    className?: string;
    style?: React.CSSProperties;
}
declare function VideoStream({ participantId, className, style }: VideoStreamProps): react_jsx_runtime.JSX.Element;

interface AudioVisualizerProps {
    participantId?: string;
    barCount?: number;
    className?: string;
    style?: React.CSSProperties;
}
declare function AudioVisualizer({ participantId, barCount, className, style }: AudioVisualizerProps): react_jsx_runtime.JSX.Element | null;

declare function useSession(): {
    session: TalentSession | null;
    connectionState: TalentConnectionState;
    isConnected: boolean;
    connect: ((options: TalentConnectionOptions) => Promise<void>) | undefined;
    disconnect: (() => Promise<void>) | undefined;
    enableCamera: ((enabled?: boolean) => Promise<void>) | undefined;
    enableMicrophone: ((enabled?: boolean) => Promise<void>) | undefined;
    enableScreenShare: ((enabled?: boolean) => Promise<void>) | undefined;
    sendMessage: ((text: string) => Promise<void>) | undefined;
};

declare function useParticipant(participantId?: string): TalentParticipant | undefined;

declare function useTracks(): TalentTrack[];

export { AudioVisualizer, DeepTalent, SessionProvider, TalentConnectionState, TalentSession, VideoStream, createTrackReference, useParticipant, useSession, useTracks };
export type { TalentConnectionOptions, TalentParticipant, TalentSessionConfig, TalentSessionEvents, TalentTrack, TrackReference };
