import { useState } from "react";
import Cookies from "js-cookie";
import {
  fetchAuthToken,
  getArtist,
  getArtistId,
  getArtistTopTracks,
} from "../utils/spotify";

export default function Form({ setArtist, setIsLoading }) {
  const [name, setName] = useState("");

  const fetchArtist = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setArtist(null);

    // Fetch the auth token
    const token = Cookies.get("token") || (await fetchAuthToken());

    // Fetch the artist id
    const artistId = await getArtistId(name, token);

    // Fetch the artist's metadata
    const artist = await getArtist(artistId, token);

    setArtist(artist);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={fetchArtist}
      className="h-16 w-full backdrop-blur-md bg-white/20 rounded-3xl flex items-center"
    >
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter an artist name..."
        autoFocus
        className="w-3/5 text-xl ml-auto bg-transparent focus:outline-none text-white sm:text-4xl"
      />
      <button
        className="w-24 h-3/5 mr-4 bg-[#6A6A6A] text-md sm:text-lg rounded-2xl hover:btn-hover"
        disabled={name == ""}
      >
        Search
      </button>
    </form>
  );
}
