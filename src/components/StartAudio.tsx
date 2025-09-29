// src/components/StartAudio.tsx
import React from 'react';
import { StartAudio as LKStartAudio } from '@livekit/components-react';

export interface StartAudioProps {
  label?: string;
  className?: string;
}

export function StartAudio({ label = "Start Audio", className }: StartAudioProps) {
  return <LKStartAudio label={label} className={className} />;
}