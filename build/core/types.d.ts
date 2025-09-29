import { Track, RemoteParticipant, LocalParticipant } from 'livekit-client';
export interface TalentSessionConfig {
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
export interface TalentConnectionOptions {
    wsUrl: string;
    token: string;
    autoConnect?: boolean;
}
export declare enum TalentConnectionState {
    Disconnected = "disconnected",
    Connecting = "connecting",
    Connected = "connected",
    Reconnecting = "reconnecting",
    Disconnecting = "disconnecting"
}
export declare enum TalentTrackKind {
    Audio = "audio",
    Video = "video"
}
export declare enum TalentTrackSource {
    Camera = "camera",
    Microphone = "microphone",
    ScreenShare = "screen_share",
    Unknown = "unknown"
}
export interface TalentTrackReference {
    participant: any;
    source: Track.Source | string;
    publication?: any;
}
export interface TalentParticipant {
    id: string;
    name?: string;
    isLocal: boolean;
    isAgent: boolean;
    metadata?: string;
    attributes?: Record<string, string>;
}
export interface TalentTrack {
    id: string;
    kind: TalentTrackKind;
    source: TalentTrackSource;
    participant: TalentParticipant;
    enabled: boolean;
}
export interface TalentSessionEvents {
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
export interface TrackReference {
    participant: RemoteParticipant | LocalParticipant;
    source: Track.Source;
    publication?: any;
}
export declare function createTrackReference(participant: RemoteParticipant | LocalParticipant, source: Track.Source, trackType: 'audio' | 'video'): TrackReference;
export interface TranscriptionSegment {
    id: string;
    text: string;
    startTime: number;
    endTime: number;
    final: boolean;
    language?: string;
    participant?: TalentParticipant;
}
export interface LocalAudioTrack extends TalentTrack {
    setMuted(muted: boolean): void;
    setVolume(volume: number): void;
}
export interface LocalVideoTrack extends TalentTrack {
    setMuted(muted: boolean): void;
    setQuality(quality: string): void;
}
export interface RoomConfiguration {
    name?: string;
    emptyTimeout?: number;
    maxParticipants?: number;
    metadata?: string;
}
export interface RoomAgentDispatch {
    agentName: string;
    metadata?: string;
}
//# sourceMappingURL=types.d.ts.map