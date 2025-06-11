import { MakeGenerics, Route } from '@tanstack/react-location';
import React, { Suspense } from 'react';
import { fetchArtistData } from './api';
import ArtistDataInterface from './interfaces/ArtistDataInterface';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const ArtistHome = React.lazy(() => import('./pages/ArtistHome'));
const ArtistMenu = React.lazy(() => import('./pages/ArtistMenu'));

export type LocationGenerics = MakeGenerics<{
    LoaderData: {
        artist: ArtistDataInterface;
    };
}>;

const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
    <ErrorBoundary>
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-black">
                <LoadingSpinner size="lg" />
            </div>
        }>
            {children}
        </Suspense>
    </ErrorBoundary>
);
export const routes: Route[] = [
    { 
        path: "/", 
        element: <LazyWrapper><Home /></LazyWrapper>
    },
    {
        path: "artists", 
        element: <LazyWrapper><ArtistMenu /></LazyWrapper>
    },
    {
        path: "/artist/:slug",
        element: <LazyWrapper><ArtistHome /></LazyWrapper>,
        loader: async ({ params: { slug } }) => {
            const pages = await fetchArtistData();
            return { artist: pages[slug] }
        },
    }
]
