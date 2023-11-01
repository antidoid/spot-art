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
  const [showWelcome, setShowWelcome] = useState(true);

  const fetchArtist = async (e) => {
    e.preventDefault();
    setShowWelcome(false);
    setArtist(null);

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
  };

  return (
    <div className="w-screen flex justify-center bg-product-background bg-bottom bg-cover bg-[#696969] bg-blend-multiply">
      <main className="w-[95%] sm:max-w-2xl min-h-screen font-inter flex flex-col justify-center shadow-2xl">
        <h1 className="font-mono font-bold text-white text-4xl m-4">SpotArt</h1>
        <Form name={name} setName={setName} handleSubmit={fetchArtist} />
        <Card>
          {showWelcome ? (
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
