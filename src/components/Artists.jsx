import { fetchAuthToken, getArtistId, getArtist } from "../utils/spotify";
import Cookies from "js-cookie";

export default function Artists({ artists, setArtist, setIsLoading }) {
  const fetchArtist = async (name, e) => {
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

  const artistElements = artists.map((artist) => {
    return (
      <div key={artist.id} onClick={(e) => fetchArtist(artist.name, e)}>
        <p>{artist.name}</p>
        <img src={artist.imageURL} />
      </div>
    );
  });

  return <div>{artistElements}</div>;
}
