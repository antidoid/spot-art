import { useState } from "react";
import Cookies from "js-cookie";

import { Card, Form, Tracks, Welcome } from "./components";
import {
  fetchAuthToken,
  getArtist,
  getArtistId,
  getArtistTopTracks,
} from "./utils/spotify";

export default function App() {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArtist = async (e) => {
    e.preventDefault();
    setArtist(null);
    setIsLoading(true);

    // Fetch the auth token
    const token = Cookies.get("token") || (await fetchAuthToken());

    // Fetch the artist id
    const artistId = await getArtistId(name, token);

    // Fetch the artist's metadata
    const artist = await getArtist(artistId, token);
    setArtist(artist);

    // Fetch artist's top tracks
    const topThreeTracks = await getArtistTopTracks(artistId, token);

    setArtist((prevArtist) => ({
      ...prevArtist,
      topThreeTracks,
    }));
    setIsLoading(false);
  };

  return (
    <div className="w-screen flex justify-center bg-product-background bg-bottom bg-cover bg-[#696969] bg-blend-multiply">
      <main className="w-[95%] sm:max-w-2xl min-h-screen font-inter flex flex-col justify-center shadow-2xl">
        <h1 className="font-mono font-bold text-white text-4xl m-4">SpotArt</h1>
        <Form name={name} setName={setName} handleSubmit={fetchArtist} />
        <Card>
          {isLoading ? (
            <div className="m-auto">
              <svg
                aria-hidden="true"
                class="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : !artist ? (
            <Welcome />
          ) : (
            <div className="w-full h-full flex flex-col p-4 sm:p-10 text-white font-inter">
              <div className="flex items-center">
                <img
                  src={artist?.imageURL}
                  className="w-40 h-40 rounded-full mr-4 sm:mr-12"
                />
                <div className="flex-1 mt-2 sm:mt-0 flex flex-col">
                  <p className="text-3xl sm:text-5xl">{artist?.name}</p>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-4">
                    <span>{artist?.followers}</span>
                    <span>{artist?.popularity}</span>
                    <span>{artist?.genre}</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="text-4xl mb-6">{artist && "TOP TRACKS"}</div>
                <Tracks tracks={artist?.topThreeTracks} />
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
