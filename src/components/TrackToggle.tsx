// src/components/TrackToggle.tsx
import React from 'react';
import { TrackToggle as LKTrackToggle } from '@livekit/components-react';
import { ToggleSource } from '@livekit/components-core';

export interface TrackToggleProps {
  source: ToggleSource;
  showIcon?: boolean;
  className?: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TrackToggle({ source, showIcon = true, className, onClick }: TrackToggleProps) {
  return (
    <LKTrackToggle 
      source={source}
      showIcon={showIcon}
      className={className}
      onClick={onClick}
    />
  );
}