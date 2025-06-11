import { Link } from '@tanstack/react-location'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query';
import { searchArtists } from '../api';
import { useArtist } from '../providers/ArtistProvider'
import LoadingSpinner from '../components/LoadingSpinner';
import { Search as SearchIcon } from 'lucide-react';



export default function Search() {
    const { setArtist } = useArtist();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce search query
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data: searchResults, isLoading } = useQuery(
        ['searchArtists', debouncedQuery],
        () => searchArtists(debouncedQuery),
        {
            enabled: debouncedQuery.length > 0,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    const onSearchArtist = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useLayoutEffect(() => {
        setArtist("")
    }, [])

    return (
        <div className="px-8 py-16 min-h-screen bg-cream dark:bg-black">
            <motion.div 
                className="relative mb-8 text-center space-y-6 max-w-2xl mx-auto"
                initial={{y: 50,opacity: 0}}
                animate={{y: 0,opacity: 1}}
                transition={{
                    duration: 0.5,
                }}
            >
                <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                    Find your favourite KPOP groups & artists
                </h1>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="artist-search"
                        type="text"
                        placeholder="Search for artists..."
                        className="w-full pl-10 pr-4 py-4 text-lg font-light focus:outline-none bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-black dark:focus:border-cream transition-colors duration-300"
                        value={searchQuery}
                        onChange={onSearchArtist}
                    />
                </div>
            </motion.div>
            
            <section className="artist-list max-w-6xl mx-auto mt-12">
                {isLoading && (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner size="lg" />
                    </div>
                )}
                
                {searchResults && searchResults.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {searchResults.map((artist, index) => (
                            <motion.div
                                key={artist.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 changing-border"
                            >
                                <Link 
                                    to={`/artist/${artist.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    onClick={() => setArtist(artist.title)}
                                    className="block"
                                >
                                    <h3 className="text-xl font-bold mb-2">{artist.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                        {artist.bio.substring(0, 150)}...
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
                
                {searchQuery && !isLoading && searchResults?.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No artists found for "{searchQuery}"
                        </p>
                    </motion.div>
                )}
                
                {!searchQuery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Start typing to search for your favorite K-pop artists
                        </p>
                    </motion.div>
                )}
            </section>
        </div>
    )
}
