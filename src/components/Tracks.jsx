import Track from "./Track";

export default function Tracks({ tracks }) {
  return tracks?.map((track) => <Track key={track.id} track={track} />);
}
