import { fetchAuthToken, getArtistId, getArtist } from "../utils/spotify";
import Cookies from "js-cookie";

export default function Artists({ artists, setArtist, setIsLoading }) {
  const fetchArtist = async (name) => {
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

  const artistElements = artists.map((artist) => {
    return (
      <div
        key={artist.id}
        onClick={() => fetchArtist(artist.name)}
        className="text-4xl m-6 flex items-center py-2 cursor-pointer hover:bg-white/30 px-4 rounded-lg"
      >
        <img
          src={artist.imageURL}
          className="w-20 h-20 rounded-full mr-4 sm:mr-12"
        />

        <p className="text-2xl text-white sm:text-4xl">{artist.name}</p>
      </div>
    );
  });

  return <div className="w-full">{artistElements}</div>;
}
