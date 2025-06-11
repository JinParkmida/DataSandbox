import AnimatedTextReveal from '../components/AnimatedTextReveal';
import Counter from '../components/Counter';
import VideoStats from '../components/VideoStats';
import YoutubeGraph from '../components/YoutubeGraph';
import ArtistDataInterface from '../interfaces/ArtistDataInterface';

interface YoutubeStatsProps {
    artist: ArtistDataInterface
}
export const YoutubeStats = ({ artist }: YoutubeStatsProps) => {

    return (
        <section id="youtube-counts-section" className="section-padding">
            <div className='youtube-subs__container text-center mb-24 md:mb-[10vh]'>
                <h2>
                    <AnimatedTextReveal
                        target='.youtube-subs__title'
                        charClass='youtube-subs__title-char'
                        className='youtube-subs__title font-heading-2 inline-block'
                    >
                        Total Youtube Subscribers
                    </AnimatedTextReveal>
                </h2>

                <Counter
                    className='youtube=subs__count text-[clamp(22px,12vw,300px)] text-center'
                    from={100000}
                    to={artist.total_youtube_subscribers}
                    duration={2}
                />
            </div>
            <div className='youtube-videos__container'>
                <h2>
                    <AnimatedTextReveal
                        target='.youtube-videos__title'
                        charClass='youtube-videos__title-char'
                        className='youtube-videos__title font-heading-2 inline-block'
                    >
                        Most Watched Videos
                    </AnimatedTextReveal>
                </h2>
                <ul className='youtube-videos__list relative flex flex-wrap justify-around xl:justify-between w-full h-full gap-5 md:gap-10'>
                    {artist.most_watched_videos.map((video, videoIndex) => {
                        return (
                            <li key={`youtube-video-${videoIndex}`} className='youtube-videos__list-item shrink-0 w-full md:w-1/3 xl:w-1/4 2xl:w-1/5'>
                                <VideoStats
                                    index={videoIndex}
                                    folder={artist.assets_folder_name}
                                    total_views={video.video_total_views}
                                    thumbnail={video.video_thumbnail}
                                    url={video.video_url}
                                    title={video.video_title}
                                    date_published={video.video_date_published}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='youtube-stats__container space-y-10 py-[10vh] lg:py-[20v]'>
                <h2>
                    <AnimatedTextReveal
                        target='.youtube-stats__title'
                        charClass='youtube-stats__title-char'
                        className='youtube-stats__title font-heading-2 inline-block'
                    >
                        Youtube Statistics
                    </AnimatedTextReveal>
                </h2>
                <div className='youtube-stats__wrapper'>
                    <YoutubeGraph />
                </div>
            </div>
        </section >
    )
}

export default YoutubeStats;
