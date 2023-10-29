import Cookies from "js-cookie";

export async function fetchAuthToken() {
  const authRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_CLIENT_ID
      }&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`,
  });
  const { access_token: token } = await authRes.json();
  Cookies.set("token", token, { expires: 1 / 24, sameSite: "strict" });
  return token;
}

export async function getArtistId(name, token) {
  const searchQueryParam = name.split(" ").join("+");
  const searchURL = `https://api.spotify.com/v1/search?q=${searchQueryParam}&type=artist&limit=1`;
  const artistIdRes = await fetch(searchURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { artists } = await artistIdRes.json();
  return artists.items[0].id;
}

function getReleaseYear(date, datePrecision) {
  if (datePrecision === "year") {
    return date;
  } else {
    return date.split("-")[0];
  }
}

export async function getArtist(id, token) {
  const artistURL = `https://api.spotify.com/v1/artists/${id}`;
  const artistRes = await fetch(artistURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const {
    name,
    followers: { total },
    genres,
    popularity,
    images,
    external_urls: { spotify: profileURL },
  } = await artistRes.json();

  return {
    id,
    name,
    followers: total,
    genre: genres[0],
    popularity,
    images,
    profileURL,
  };
}

export async function getArtistTopTracks(id, token) {
  const topTracksURL = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`;
  const topTracksRes = await fetch(topTracksURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { tracks } = await topTracksRes.json();

  const topThreeTracks = tracks
    .filter((track) => track.preview_url)
    .slice(0, 3);

  // Add as many unique tracks from the 'tracks' array as needed
  // to make the 'playableTracks' array have a total length of 3.
  while (topThreeTracks.length < 3) {
    const nextTrack = tracks.find((track) => !topThreeTracks.includes(track));

    if (!nextTrack) break;
    topThreeTracks.push(nextTrack);
  }

  return topThreeTracks.map((track) => ({
    id: track.id,
    name: track.name,
    albumName: track.album.name,
    albumImages: track.album.images,
    releaseYear: getReleaseYear(
      track.album.release_date,
      track.album.release_date_precision,
    ),
    previewURL: track.previewURL,
  }));
}
