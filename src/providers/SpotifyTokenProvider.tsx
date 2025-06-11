import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchSpotifyAccessToken } from "../api";
import useSessionStorage from "../hooks/useSessionStorage";
import SpotifyWebApi from 'spotify-web-api-js';

interface SpotifyAuthResponse {
  access_token?: string,
  token_type?: string,
  expires_in?: number
}

type SpotifyTokenContextType = {
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs,
  spotifyToken: SpotifyAuthResponse;
  setSpotifyToken: React.Dispatch<React.SetStateAction<SpotifyAuthResponse>>;
} & SpotifyTokenContextState;


type SpotifyTokenContextState = {
  spotifyToken: SpotifyAuthResponse;
};



const SpotifyTokenContext = React.createContext<SpotifyTokenContextType>(null!);
const spotifyApi = new SpotifyWebApi();


export default function SpotifyTokenProvider(props: { children: React.ReactNode }) {
  const initialState: SpotifyAuthResponse = {};
  const [spotifyToken, setSpotifyToken] = useSessionStorage("spotifyToken", initialState);
  const { data, isRefetching } = useQuery("spotifyToken", fetchSpotifyAccessToken, {
    enabled: !spotifyToken.access_token,
    onError: () => setSpotifyToken(initialState)
  })

  useEffect(() => {
    if (data?.access_token && !spotifyToken?.access_token) {
      setSpotifyToken(data)
    }
  }, [data, isRefetching])

  useEffect(() => {
    if (spotifyToken.access_token) {
      spotifyApi.setAccessToken(spotifyToken.access_token)
    }
  }, [spotifyToken?.access_token])

  const contextValue = React.useMemo(
    () => ({
      spotifyApi,
      spotifyToken,
      setSpotifyToken
    }),
    [spotifyToken, spotifyApi, setSpotifyToken]
  );

  return (
    <SpotifyTokenContext.Provider value={contextValue} children={props.children} />
  );
}

export function useSpotifyToken() {
  return React.useContext(SpotifyTokenContext);
}
