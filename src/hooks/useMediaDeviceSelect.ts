// src/hooks/useMediaDeviceSelect.ts
import { useState, useEffect } from 'react';

export interface MediaDeviceInfo {
  deviceId: string;
  label: string;
  kind: MediaDeviceKind;
}

export function useMediaDeviceSelect(kind: MediaDeviceKind) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string>('');

  useEffect(() => {
    async function loadDevices() {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const filteredDevices = deviceList
        .filter(device => device.kind === kind)
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `${kind} ${device.deviceId}`,
          kind: device.kind as MediaDeviceKind
        }));
      setDevices(filteredDevices);
    }

    loadDevices();
    
    navigator.mediaDevices.addEventListener('devicechange', loadDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', loadDevices);
    };
  }, [kind]);

  return { devices, activeDeviceId, setActiveDeviceId };
}