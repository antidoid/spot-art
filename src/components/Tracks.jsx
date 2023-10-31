import { useState } from "react";

import Track from "./Track";

export default function Tracks({ tracks }) {
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);

  // Function to set the currently playing index
  const handleAudioPlayback = (index) => {
    if (index === currentlyPlayingIndex) {
      setCurrentlyPlayingIndex(null); // Pause the currently playing audio
    } else {
      setCurrentlyPlayingIndex(index); // Start the new audio
    }
  };

  return tracks?.map((track, index) => (
    <Track
      key={track.id}
      track={track}
      isPlaying={index === currentlyPlayingIndex}
      onPlaybackChange={() => handleAudioPlayback(index)}
    />
  ));
}
