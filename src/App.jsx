import { useState } from "react";

import { Card, Form } from "./components";
import smile from "./assets/smile.svg";

export default function App() {
  const [name, setName] = useState("");

  const fetchArtist = async (e) => {
    e.preventDefault();
    // Fetch the auth token
    const authRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${
        import.meta.env.VITE_CLIENT_ID
      }&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`,
    });
    const { access_token: token } = await authRes.json();

    // Fetch the artist id
    const searchQueryParam = name.split(" ").join("+");
    const searchURL = `https://api.spotify.com/v1/search?q=${searchQueryParam}&type=artist&limit=1`;
    const artistIdRes = await fetch(searchURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { artists } = await artistIdRes.json();
    const id = artists.items[0].id;

    // Fetch the artist's metadata
    const artistURL = `https://api.spotify.com/v1/artists/${id}`;
    const artistRes = await fetch(artistURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      name: artistName,
      followers: { total: followersCount },
      genres,
      popularity,
      images,
      external_urls: { spotify: profileURL },
    } = await artistRes.json();

    // Fetch artist's top tracks
    const topTracksURL = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`;
    const topTracksRes = await fetch(topTracksURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { tracks } = await topTracksRes.json();

    console.log(tracks.filter((track) => track.preview_url).slice(0, 3));
  };

  return (
    <div className="w-screen flex justify-center bg-product-background bg-bottom bg-cover bg-[#696969] bg-blend-multiply">
      <main className="w-[95%] sm:max-w-2xl h-screen font-inter flex flex-col justify-center shadow-2xl">
        <h1 className="font-mono text-white text-3xl ml-4 mb-4">SpotArt</h1>
        <Form name={name} setName={setName} handleSubmit={fetchArtist} />
        <Card>
          <h2 className="text-white text-3xl sm:text-5xl">
            Welcome to SpotArt
          </h2>
          <img src={smile} className="w-[250px] mt-10" />
        </Card>
      </main>
    </div>
  );
}
