import PlayPauseBtn from "./PlayPauseBtn";
import externalLink from "../assets/external-link.svg";

export default function Track({ track, isPlaying, onPlaybackChange }) {
  return (
    <div className="mb-4 flex">
      <img src={track.albumImageURL} className="rounded-lg w-16 h-16 my-auto" />
      <div className="flex-1 flex flex-col mx-5">
        <p className="text-2xl">{track.name}</p>
        <p>
          {track.albumName} ({track.releaseYear})
        </p>
      </div>
      {track.previewURL ? (
        <PlayPauseBtn
          previewURL={track.previewURL}
          isPlaying={isPlaying}
          onPlaybackChange={onPlaybackChange}
        />
      ) : (
        <a href={track.externalURL} target="_blank" className="my-auto">
          <img src={externalLink} />
        </a>
      )}
    </div>
  );
}
