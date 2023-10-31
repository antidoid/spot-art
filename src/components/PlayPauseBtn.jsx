import { useEffect, useState } from "react";
import { useLottie } from "lottie-react";

import playPauseAnimation from "../assets/zf0OXtgQou.json";
import countdown from "../assets/XLsBmAclW0.json";

export default function PlayPauseBtn({
  previewURL,
  isPlaying,
  onPlaybackChange,
}) {
  const [audio, setAudio] = useState(new Audio(previewURL));
  audio.onended = onPlaybackChange;

  const btnAnimation = useLottie({
    animationData: playPauseAnimation,
    loop: false,
    autoplay: false,
    initialSegment: [31, 35],
  });

  const countdownAnimation = useLottie({
    animationData: countdown,
    loop: true,
    autoplay: false,
    initialSegment: [31, 1840],
  });

  useEffect(() => {
    if (isPlaying) {
      btnAnimation.playSegments([40, 75], true);
      countdownAnimation.play();
      audio.play();
    } else {
      btnAnimation.playSegments([13, 32], true);
      countdownAnimation.pause();
      audio.pause();
    }

    return () => audio.load();
  }, [isPlaying]);

  return (
    <div className="relative w-12 my-auto" onClick={onPlaybackChange}>
      {btnAnimation.View}
      <div className="absolute top-0">{countdownAnimation.View}</div>
    </div>
  );
}
