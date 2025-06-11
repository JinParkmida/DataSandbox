import { useQuery, useQueryClient } from "react-query";
import { useSpotifyToken } from "../providers/SpotifyTokenProvider";


export function useSpotifySearch(query: string, params?: SpotifyApi.SearchForItemParameterObject) {
  const { spotifyApi, spotifyToken, setSpotifyToken } = useSpotifyToken();
  const queryClient = useQueryClient();
  const searchKpopArtists = async () => await spotifyApi.searchArtists(query, params);
  const data = useQuery(["spotify_search", query], searchKpopArtists, {
    enabled: !!spotifyToken.access_token,
    onError: (err: XMLHttpRequest) => {
      const { error }: { error: SpotifyApi.ErrorObject } = JSON.parse(err.response);
      if (error.status === 401) {
        setSpotifyToken({});
        queryClient.invalidateQueries("spotifyToken");
      };
    }
  });
  return data;
}

export function useSpotifyArtist(artistId: string, params?: SpotifyApi.SearchForItemParameterObject) {
  const { spotifyApi, spotifyToken, setSpotifyToken } = useSpotifyToken();
  const queryClient = useQueryClient();
  const getKpopArtist = async () => await spotifyApi.getArtist(artistId, params);
  const data = useQuery(["spotify_search", artistId], getKpopArtist, {
    enabled: !!spotifyToken.access_token,
    onError: (err: XMLHttpRequest) => {
      const { error }: { error: SpotifyApi.ErrorObject } = JSON.parse(err.response);
      if (error.status === 401) {
        setSpotifyToken({});
        queryClient.invalidateQueries("spotifyToken");
      };
    },
    refetchOnWindowFocus: false
  })
  return data;
}

export function useSpotifyArtistTopTracks(artistId: string, params?: SpotifyApi.SearchForItemParameterObject) {
  const { spotifyApi, spotifyToken, setSpotifyToken } = useSpotifyToken();
  const queryClient = useQueryClient();
  const getKpopArtistTopTracks = async () => await spotifyApi.getArtistTopTracks(artistId, "KR");
  const data = useQuery(["artis_top_tracks", artistId], getKpopArtistTopTracks, {
    enabled: !!spotifyToken.access_token,
    onError: (err: XMLHttpRequest) => {
      const { error }: { error: SpotifyApi.ErrorObject } = JSON.parse(err.response);
      if (error.status === 401) {
        setSpotifyToken({});
        queryClient.invalidateQueries("spotifyToken");
      };
    }
  });
  return data;
}
