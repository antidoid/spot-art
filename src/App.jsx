import { useState } from "react";

import { Artist, Artists, Card, Form, Spinner, Welcome } from "./components";

export default function App() {
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState(null);
  const [showHome, setShowHome] = useState(true);

  const handleLogoClick = () => {
    setArtist(null);
    setArtists(null);
    setIsLoading(false);
    setShowHome(true);
  };

  return (
    <div className="w-screen flex justify-center bg-product-background bg-bottom bg-cover bg-[#696969] bg-blend-multiply">
      <main className="w-[95%] sm:max-w-2xl min-h-screen font-inter flex flex-col justify-center shadow-2xl">
        <h1
          className="hover:underline font-mono font-bold text-white text-4xl m-4 cursor-pointer fix-canvas-bug"
          onClick={handleLogoClick}
        >
          SpotArt
        </h1>
        <Form
          showHome={showHome}
          setShowHome={setShowHome}
          setArtist={setArtist}
          setIsLoading={setIsLoading}
          setArtists={setArtists}
        />
        <Card>
          {showHome ? (
            <Welcome />
          ) : isLoading ? (
            <Spinner />
          ) : artist ? (
            <Artist artist={artist} />
          ) : (
            artists && (
              <Artists
                artists={artists}
                setArtist={setArtist}
                setIsLoading={setIsLoading}
              />
            )
          )}
        </Card>
      </main>
    </div>
  );
}
