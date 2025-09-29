import React from 'react';
import { VideoTrack as LKVideoTrack } from '@livekit/components-react';
import { Track, RemoteParticipant, LocalParticipant } from 'livekit-client';
import { TrackReference } from '@livekit/components-core';
import { useSessionContext } from './SessionProvider';

export interface VideoStreamProps {
  participantId?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function VideoStream({ participantId, className, style }: VideoStreamProps) {
  const { session } = useSessionContext();
  
  const room = session?._internal;
  
  if (!room) {
    return <div className={className} style={style}>No session</div>;
  }

  const participant = participantId 
    ? room.remoteParticipants.get(participantId) || room.localParticipant
    : room.localParticipant;

  if (!participant) {
    return <div className={className} style={style}>Participant not found</div>;
  }

  // Get the first video track publication
  const videoPublications = [...participant.videoTrackPublications.values()];
  const videoPublication = videoPublications.find(pub => pub.track);

  // Create LiveKit's TrackReference (publication is required)
  const trackRef: TrackReference = {
    participant,
    source: Track.Source.Camera,
    publication: videoPublication! // Make it required
  };

  return (
    <LKVideoTrack 
      trackRef={trackRef}
      className={className}
      style={style}
    />
  );
}