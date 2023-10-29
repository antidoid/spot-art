import { useState } from "react";
import Cookies from "js-cookie";

import { Card, Form, Welcome } from "./components";
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
        <h1 className="font-mono text-white text-3xl ml-4 mb-4">SpotArt</h1>
        <Form name={name} setName={setName} handleSubmit={fetchArtist} />
        <Card>
          <>
            {showWelcome ? (
              <Welcome />
            ) : (
              <div>
                <div>{artist?.name}</div>
                <div>{artist?.genre}</div>
              </div>
            )}
          </>
        </Card>
      </main>
    </div>
  );
}
