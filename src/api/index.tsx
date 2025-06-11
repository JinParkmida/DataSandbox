import ArtistDataInterface from "../interfaces/ArtistDataInterface";

export const fetchSpotifyAccessToken = async () => {
  const tokenBuffer = btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_SECRET_KEY);
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      'Authorization': `Basic ${tokenBuffer}`,
    },
    body: urlencoded
  })
  return await response.json();
}

export const fetchArtistDataFromJSON = async (): Promise<Record<string, ArtistDataInterface>> => {
  const res = await fetch(`${process.env.PUBLIC_URL}/getArtistData.json`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  const pageList = await res.json();
  return pageList
}