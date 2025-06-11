import React from "react";
import useSessionStorage from "../hooks/useSessionStorage";

type ArtistContextType = {
  artist: string;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
} & ArtistContextState;

type ArtistContextState = {
  artist: string;
};

const ArtistContext = React.createContext<ArtistContextType>(null!);

export default function ArtistProvider(props: { children: React.ReactNode }) {
  const [artist, setArtist] = useSessionStorage("artist", "");

  const contextValue = React.useMemo(
    () => ({
      artist,
      setArtist
    }),
    [artist]
  );

  return (
    <ArtistContext.Provider value={contextValue} children={props.children} />
  );
}

export function useArtist() {
  return React.useContext(ArtistContext);
}
