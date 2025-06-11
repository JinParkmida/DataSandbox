import AnimatedTextReveal from '../components/AnimatedTextReveal';
import Counter from '../components/Counter';
import SpotifyGraph from '../components/SpotifyGraph';
import VideoStats from '../components/VideoStats';
import ArtistDataInterface from '../interfaces/ArtistDataInterface';

type StreamStatsProps = {
    artist: ArtistDataInterface
}
export default function StreamStats({ artist }: StreamStatsProps) {
    return (
        <section id="spotify-counts-section" className="section-padding">
            <div className='spotify-subs__container text-center mb-24 md:mb-[10vh]'>
                <h2>
                    <AnimatedTextReveal
                        target='.spotify-subs__title'
                        charClass='spotify-subs__title-char'
                        className='spotify-subs__title font-heading-2 inline-block'
                    >
                        Total spotify followers
                    </AnimatedTextReveal>
                </h2>

                <Counter
                    className='spotify-subs__count text-[clamp(22px,12vw,300px)] text-center'
                    from={100000}
                    to={artist.total_spotify_followers}
                    duration={2}
                />
            </div>
            <div className='spotify-videos__container'>
                <h2>
                    <AnimatedTextReveal
                        target='.spotify-videos__title'
                        charClass='spotify-videos__title-char'
                        className='spotify-videos__title font-heading-2 inline-block'
                    >
                        Most Watched Videos
                    </AnimatedTextReveal>
                </h2>
                <ul className='spotify-videos__list relative flex flex-wrap justify-around xl:justify-between w-full h-full gap-5 md:gap-10'>
                    {artist.most_streamed_songs.map((song, songIndex) => {
                        return (
                            <li key={`spotify-song-${songIndex}`} className='spotify-songs__list-item shrink-0 w-full md:w-1/3 xl:w-1/4 2xl:w-1/5'>
                                <VideoStats
                                    index={`song-${songIndex}`}
                                    folder={artist.assets_folder_name}
                                    total_views={song.song_total_views}
                                    thumbnail={song.song_thumbnail}
                                    url={song.song_url}
                                    title={song.song_title}
                                    date_published={song.song_date_published}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='spotify-stats__container space-y-10 py-[10vh] lg:py-[20v]'>
                <h2>
                    <AnimatedTextReveal
                        target='.spotify-stats__title'
                        charClass='spotify-stats__title-char'
                        className='spotify-stats__title font-heading-2 inline-block'
                    >
                        Spotify Statistics
                    </AnimatedTextReveal>
                </h2>
                <div className='spotify-stats__wrapper'>
                    <SpotifyGraph />
                </div>
            </div>
        </section>
    )
}
