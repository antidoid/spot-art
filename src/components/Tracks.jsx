import { useState } from "react";

import Track from "./Track";

export default function Tracks({ tracks }) {
  const [currentPlayingTrack, setSurrentPlayingTrack] = useState(null);

  // Function to set the currently playing track
  const handleAudioPlayback = (id) => {
    if (id === currentPlayingTrack) {
      setSurrentPlayingTrack(null); // Pause the currently playing audio
    } else {
      setSurrentPlayingTrack(id); // Start the new audio
    }
  };

  return tracks?.map((track) => (
    <Track
      key={track.id}
      track={track}
      isPlaying={track.id === currentPlayingTrack}
      onPlaybackChange={() => handleAudioPlayback(track.id)}
    />
  ));
}
