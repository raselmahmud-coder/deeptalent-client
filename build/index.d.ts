import * as livekit_client from 'livekit-client';
import { RemoteParticipant, LocalParticipant, Track } from 'livekit-client';
export { ConnectionState, LocalParticipant, Participant, Track } from 'livekit-client';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default from 'react';
import { ToggleSource } from '@livekit/components-core';
export { TrackReferenceOrPlaceholder } from '@livekit/components-core';
export { useParticipantAttributes, useRoomContext, useTrackTranscription, useTracks, useVoiceAssistant } from '@livekit/components-react';

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
interface TranscriptionSegment {
    id: string;
    text: string;
    startTime: number;
    endTime: number;
    final: boolean;
    language?: string;
    participant?: TalentParticipant;
}
interface LocalAudioTrack extends TalentTrack {
    setMuted(muted: boolean): void;
    setVolume(volume: number): void;
}
interface LocalVideoTrack extends TalentTrack {
    setMuted(muted: boolean): void;
    setQuality(quality: string): void;
}
interface RoomConfiguration {
    name?: string;
    emptyTimeout?: number;
    maxParticipants?: number;
    metadata?: string;
}
interface RoomAgentDispatch {
    agentName: string;
    metadata?: string;
}

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
    children: React__default.ReactNode;
    session: TalentSession;
}
declare function SessionProvider({ children, session }: SessionProviderProps): react_jsx_runtime.JSX.Element;

interface VideoStreamProps {
    participantId?: string;
    className?: string;
    style?: React__default.CSSProperties;
}
declare function VideoStream({ participantId, className, style }: VideoStreamProps): react_jsx_runtime.JSX.Element;

interface AudioVisualizerProps {
    participantId?: string;
    barCount?: number;
    className?: string;
    style?: React__default.CSSProperties;
}
declare function AudioVisualizer({ participantId, barCount, className, style }: AudioVisualizerProps): react_jsx_runtime.JSX.Element | null;

interface ChatMessageProps {
    message: {
        id: string;
        message: string;
        from?: {
            id: string;
            name?: string;
            isLocal: boolean;
        };
        timestamp: number;
    };
    className?: string;
}
declare function ChatMessage$1({ message, className }: ChatMessageProps): react_jsx_runtime.JSX.Element;

interface TrackToggleProps {
    source: ToggleSource;
    showIcon?: boolean;
    className?: string;
    onClick?: (evt: React__default.MouseEvent<HTMLButtonElement>) => void;
}
declare function TrackToggle({ source, showIcon, className, onClick }: TrackToggleProps): react_jsx_runtime.JSX.Element;

interface TalentRoomProps {
    session: TalentSession;
    serverUrl: string;
    token: string;
    connectOptions?: any;
    children: React__default.ReactNode;
}
declare function TalentRoom({ session, serverUrl, token, connectOptions, children }: TalentRoomProps): react_jsx_runtime.JSX.Element;

declare function RoomAudioRenderer(): react_jsx_runtime.JSX.Element;

interface StartAudioProps {
    label?: string;
    className?: string;
}
declare function StartAudio({ label, className }: StartAudioProps): react_jsx_runtime.JSX.Element;

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
declare function useLocalParticipant(): TalentParticipant | undefined;

declare function useConnectionState(): TalentConnectionState;

declare function useDataChannel(): {
    sendMessage: (data: string | Uint8Array) => Promise<void>;
};

interface RoomInfo {
    name?: string;
    metadata?: string;
}
declare function useRoomInfo(): RoomInfo;

interface ChatMessage {
    id: string;
    message: string;
    from?: TalentParticipant;
    timestamp: number;
}
declare function useChat(): {
    messages: ChatMessage[];
    send: (message: string) => Promise<void>;
};

interface MediaDeviceInfo {
    deviceId: string;
    label: string;
    kind: MediaDeviceKind;
}
declare function useMediaDeviceSelect(kind: MediaDeviceKind): {
    devices: MediaDeviceInfo[];
    activeDeviceId: string;
    setActiveDeviceId: React.Dispatch<React.SetStateAction<string>>;
};

export { AudioVisualizer, ChatMessage$1 as ChatMessage, DeepTalent, RoomAudioRenderer, SessionProvider, StartAudio, TalentConnectionState, TalentRoom, TalentSession, TrackToggle, VideoStream, createTrackReference, useChat, useConnectionState, useDataChannel, useLocalParticipant, useMediaDeviceSelect, useParticipant, useRoomInfo, useSession };
export type { LocalAudioTrack, LocalVideoTrack, RoomAgentDispatch, RoomConfiguration, TalentConnectionOptions, TalentParticipant, TalentSessionConfig, TalentSessionEvents, TalentTrack, TrackReference, TranscriptionSegment };
