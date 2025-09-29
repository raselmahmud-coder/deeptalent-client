export declare function useSession(): {
    session: import("..").TalentSession | null;
    connectionState: import("..").TalentConnectionState;
    isConnected: boolean;
    connect: ((options: import("..").TalentConnectionOptions) => Promise<void>) | undefined;
    disconnect: (() => Promise<void>) | undefined;
    enableCamera: ((enabled?: boolean) => Promise<void>) | undefined;
    enableMicrophone: ((enabled?: boolean) => Promise<void>) | undefined;
    enableScreenShare: ((enabled?: boolean) => Promise<void>) | undefined;
    sendMessage: ((text: string) => Promise<void>) | undefined;
};
//# sourceMappingURL=useSession.d.ts.map