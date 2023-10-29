import { useState } from "react";

import { Card, Form } from "./components";
import smile from "./assets/smile.svg";
import { getArtist, getArtistId, getArtistTopTracks } from "./utils/spotify";

export default function App() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState(null);

  const fetchArtist = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    // Fetch the auth token
    const authRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_CLIENT_ID
        }&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`,
    });
    const { access_token: token } = await authRes.json();

    // Fetch the artist id
    const artistId = await getArtistId(name, token);

    // Fetch the artist's metadata
    const artist = await getArtist(artistId, token);

    // Fetch artist's top tracks
    artist.topThreeTracks = await getArtistTopTracks(artistId, token);

    setArtist(artist);
    setIsLoading(false);
  };

  return (
    <div className="w-screen flex justify-center bg-product-background bg-bottom bg-cover bg-[#696969] bg-blend-multiply">
      <main className="w-[95%] sm:max-w-2xl h-screen font-inter flex flex-col justify-center shadow-2xl">
        <h1 className="font-mono text-white text-3xl ml-4 mb-4">SpotArt</h1>
        <Form name={name} setName={setName} handleSubmit={fetchArtist} />
        <Card>
          {isLoading ? (
            <div>Loading..</div>
          ) : (
            <>
              {artist ? (
                <div>
                  <div>{artist.name}</div>
                  <div>{artist.genre}</div>
                  <div>{artist.topThreeTracks[0].name}</div>
                  <div>{artist.topThreeTracks[0].releaseYear}</div>
                </div>
              ) : (
                <>
                  <h2 className="text-white text-3xl sm:text-5xl">
                    Welcome to SpotArt
                  </h2>
                  <img src={smile} className="w-[250px] mt-10" />
                </>
              )}
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
