import { MakeGenerics, Route } from '@tanstack/react-location';
import { fetchArtistDataFromJSON } from './api';
import ArtistDataInterface from './interfaces/ArtistDataInterface';
import { Home, ArtistHome, ArtistMenu } from './pages';

export type LocationGenerics = MakeGenerics<{
    LoaderData: {
        artist: ArtistDataInterface;
    };
}>;

export const routes: Route[] = [
    { path: "/", element: <Home /> },
    {
        path: "artists", element: <ArtistMenu />
    },
    {
        path: "/artist/:slug",
        element: <ArtistHome />,
        loader: async ({ params: { slug } }) => {
            const pages = await fetchArtistDataFromJSON();
            return { artist: pages[slug] }
        },
    }
]
