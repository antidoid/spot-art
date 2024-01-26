import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchAuthToken, getArtists } from "../utils/spotify";

export default function Form({
  setShowHome,
  setArtist,
  setIsLoading,
  setArtists,
  showHome,
}) {
  const [name, setName] = useState("");

  // Empties the search box one user clicks the "SpotArt" home button
  useEffect(() => {
    if (showHome) setName("");
  }, [showHome]);

  const fetchArtists = async (e) => {
    e.preventDefault();
    setShowHome(false);
    setIsLoading(true);
    setArtist(null);

    // Fetch the auth token
    const token = Cookies.get("token") || (await fetchAuthToken());

    // Fetch a list of artists with the same name
    const artists = await getArtists(name, token);
    setArtists(artists);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={fetchArtists}
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
        className="w-20 sm:w-28 h-full flex justify-center items-center ml-4 bg-[#6A6A6A] text-md sm:text-lg rounded-r-3xl hover:btn-hover"
        disabled={name == ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
}
