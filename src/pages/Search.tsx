import { Link } from '@tanstack/react-location'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { useSpotifySearch } from '../hooks/useSpotify';
import { useArtist } from '../providers/ArtistProvider'

type ArtistsGroupedByName = {
    group: string,
    children: SpotifyApi.ArtistObjectFull[]
}


export default function Search() {
    const { setArtist } = useArtist();
    
    const { data } = useSpotifySearch('genre:k-pop', {limit: 50, });
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchArtist = (event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value); 

    useLayoutEffect(() => {
        setArtist("")
    }, [])

    return (
        <div className="px-8 py-16">
            <motion.div 
                className="relative mb-6 text-center space-y-4 mx-40 2xl:mx-60"
                initial={{y: 50,opacity: 0}}
                animate={{y: 0,opacity: 1}}
                transition={{
                    duration: 0.5,
                }}
            >
                <label htmlFor="artist-search" className="text-4xl">Find your favourite KPOP groups & artists</label>
                <div className="before:absolute before:w-full before:scale-x-0 hover:before:scale-x-100 before:origin-center before:h-[2px] before:bg-dark dark:before:bg-cream before:z-[1] before:left-0 before:bottom-0 before:transition-transform">
                    <input
                        id="artist-search"
                        type="text"
                        placeholder="Type here"
                        className="w-full py-4 text-2xl font-light placeholder:text-center focus:outline-none bg-transparent border-b-[0.5px] border-black dark:border-cream text-center"
                        value={searchQuery}
                        onChange={onSearchArtist}
                    />
                </div>
            </motion.div>
            <section className="artist-list px-40 mt-20 2xl:px-60 flex flex-wrap min-h-[50vh]">
                {data && <ArtistList data={data} setArtist={setArtist} searchQuery={searchQuery}/> }
            </section>
        </div>
    )
}

interface ArtistListProps {
    data: SpotifyApi.ArtistSearchResponse,
    setArtist: (name: string) => void,
    searchQuery: string;
    children?: React.ReactChild
}

export const ArtistList = ({ data, setArtist, searchQuery }: ArtistListProps) => {
    const GENRES_TO_FILTER = ["k-pop", "k-pop girl group", "k-pop boy group", "chinese idol pop", "korean r&b"];

    const onFilterBySearchQuery = (artist: SpotifyApi.ArtistObjectFull) => {
        if(!searchQuery) return true;
        const lowerCaseName = artist.name.toLowerCase();
        const lowerCaseSearchQuery = searchQuery.toLowerCase().trim();
        
        return lowerCaseName.includes(lowerCaseSearchQuery);
    }

    const onFilterByGenre = (artist: SpotifyApi.ArtistObjectFull) => artist.genres.some(genre =>  GENRES_TO_FILTER.includes(genre));

    const onSortByName = (artistA: {name: string}, artistB: {name: string}) => artistA.name.toUpperCase().localeCompare(artistB.name.toUpperCase(), 'en', { sensitivity: 'base' })

    const onReducedToGroups = useCallback(
        (groups: {[s: string]: ArtistsGroupedByName}, artist: SpotifyApi.ArtistObjectFull) => {
            // get first letter of name of current element
            let firstLetter = artist.name[0];
            let group: string = firstLetter.search(/\(|[0-9]/g) ? firstLetter.toUpperCase() : "0-9";
            // if there is no property in accumulator with this letter create it
            if(!groups[group]) groups[group] = {group, children: [artist]}
            // if there is push current element to children array for that letter
            else groups[group].children.push(artist);
            // return accumulator
            return groups;
        },
        [],
    )

    const artistsGroupedByName = useMemo((): Array<ArtistsGroupedByName> => {
        const groupedObj = data.artists.items
        .filter(onFilterByGenre)
        .filter(onFilterBySearchQuery)
        .sort(onSortByName)
        .reduce(onReducedToGroups, {})
        return Object.values(groupedObj);
    }, [data, searchQuery])

    const normalizeArtistName = (name: string) => name.replaceAll(/\s/g, "-").toLowerCase();

    return (
        <AnimatePresence>
            {artistsGroupedByName.map((section: ArtistsGroupedByName, index) => (
                <motion.div 
                    key={`artist-section-${section.group}`} 
                    className="relative w-full mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0}}
                    transition={{
                        easings: ["easeIn", "easeOut"],
                        duration: 0.4,
                    }}
                >
                    <motion.h3 className="absolute -left-40 text-3xl">{section.group}</motion.h3>
                    <motion.ol layout className="text-xl font-light grid gap-4 grid-cols-4 text-left pt-4">
                        <AnimatePresence>
                            {section.children.map(artist => (
                                <motion.li 
                                    key={artist.id}
                                    initial={{y: 36, opacity: 0 }}
                                    animate={{y: 0, opacity: 1 }}
                                    exit={{y: -36, opacity: 0}}
                                    transition={{
                                        easings: ["easeIn", "easeOut"],
                                        duration: 0.4,
                                        delay: 0.4
                                    }}
                                >
                                    <Link to={`/artist/${normalizeArtistName(artist.name)}/${artist.id}`} onClick={() => setArtist(artist.name)}>
                                        {artist.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </motion.ol>
                </motion.div>
            ))}
        </AnimatePresence>
    )
}
