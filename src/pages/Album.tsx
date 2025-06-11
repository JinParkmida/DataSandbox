import AlbumItem from "../components/AlbumItem";
import AlbumSalesGraph from "../components/AlbumSalesGraph";
import AnimatedTextReveal from "../components/AnimatedTextReveal";
import Counter from "../components/Counter";
import ArtistDataInterface from "../interfaces/ArtistDataInterface";

type AlbumProps = {
    artist: ArtistDataInterface
}

export default function Album({ artist }: AlbumProps) {
    return (
        <section id="album-section" className="section-padding">
            <div className='album__container text-center mb-24 md:mb-[10vh]'>
                <h2>
                    <AnimatedTextReveal
                        target='.album__title'
                        charClass='album__title-char'
                        className='album__title font-heading-2 inline-block'
                    >
                        Total album sales
                    </AnimatedTextReveal>
                </h2>

                <Counter
                    className='album__count text-[clamp(22px,12vw,300px)] text-center'
                    from={100000}
                    to={artist.total_album_sales}
                    duration={2}
                />
            </div>
            <div className="album-list__container">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-16 xl:gap-20 justify-center min-w-[300px]">
                    {artist.album_list.map((album, albumIndex) => {
                        return (
                            <AlbumItem
                                key={`album-item-${albumIndex}`}
                                folder={artist.assets_folder_name}
                                title={album.album_title}
                                thumbnail={album.album_thumbnail}
                                info={album.album_info}
                                released_date={album.album_released_date}
                                total_sales={album.album_total_sales}
                            />
                        )
                    })}
                </ul>
            </div>
            <div className='album-stats__container space-y-10 py-[10vh] lg:py-[20v]'>
                <h2>
                    <AnimatedTextReveal
                        target='.album-stats__title'
                        charClass='album-stats__title-char'
                        className='album-stats__title font-heading-2 inline-block'
                    >
                        Album Statistics
                    </AnimatedTextReveal>
                </h2>
                <div className='album-stats__wrapper'>
                    <AlbumSalesGraph />
                </div>
            </div>
        </section>
    )
}
