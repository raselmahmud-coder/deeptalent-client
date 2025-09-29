export interface MediaDeviceInfo {
    deviceId: string;
    label: string;
    kind: MediaDeviceKind;
}
export declare function useMediaDeviceSelect(kind: MediaDeviceKind): {
    devices: MediaDeviceInfo[];
    activeDeviceId: string;
    setActiveDeviceId: import("react").Dispatch<import("react").SetStateAction<string>>;
};
//# sourceMappingURL=useMediaDeviceSelect.d.ts.map