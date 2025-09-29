import React from 'react';
import { BarVisualizer } from '@livekit/components-react';
import { Track, RemoteParticipant, LocalParticipant } from 'livekit-client';
import { TrackReference } from '@livekit/components-core';
import { useSessionContext } from './SessionProvider';

export interface AudioVisualizerProps {
  participantId?: string;
  barCount?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AudioVisualizer({ 
  participantId, 
  barCount = 5, 
  className, 
  style 
}: AudioVisualizerProps) {
  const { session } = useSessionContext();
  const room = session?._internal;
  
  if (!room) {
    return null;
  }

  const participant = participantId 
    ? room.remoteParticipants.get(participantId) || room.localParticipant
    : room.localParticipant;

  if (!participant) {
    return null;
  }

  // Get the first audio track publication
  const audioPublications = [...participant.audioTrackPublications.values()];
  const audioPublication = audioPublications.find(pub => pub.track);

  // Create LiveKit's TrackReference (publication is required)
  const trackRef: TrackReference = {
    participant,
    source: Track.Source.Microphone,
    publication: audioPublication! // Make it required
  };

  return (
    <BarVisualizer
      trackRef={trackRef}
      barCount={barCount}
      className={className}
      style={style}
    />
  );
}