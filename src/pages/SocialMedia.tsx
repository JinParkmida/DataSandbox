import { Swiper, SwiperSlide } from 'swiper/react';
import Counter from '../components/Counter'
import MemberItem from '../components/MemberItem';
import { AiOutlineInstagram } from 'react-icons/ai';
import AnimatedTextReveal from '../components/AnimatedTextReveal';
import InstagramGraph from '../components/InstagramGraph';
import SocialMediaCard from '../components/SocialMediaCard';
import ArtistDataInterface from '../interfaces/ArtistDataInterface';
import 'swiper/css';
import "swiper/css/free-mode";

type SocialMediaProps = {
    artist: ArtistDataInterface
}

export default function SocialMedia({ artist }: SocialMediaProps) {

    return (
        <section id="social-media-section" className="section-padding">
            <div className='mb-3 sm:mb-10 xl:mb-20 text-left'>
                <h3 className='social-media-hashtag__count font-heading-2'>Instagram: <strong className='font-bold'><a href="#" target="_blank" rel="noopener noreferrer">{artist.instagram.hashtag}</a></strong></h3>
                <Counter
                    className='social-media-followers__count text-[clamp(22px,12vw,200px)] leading-none'
                    from={100000}
                    to={artist.total_spotify_followers}
                    duration={2}
                />
            </div>
            <div className='social-media__members text-left relative'>
                <h3 className='social-media-hashtag__count font-heading-2 mb-5 lg:mb-10'>Members Instagram:</h3>
                <Swiper
                    className='members-carousel w-full max-w-[900px] inline-block relative'
                    slidesPerView="auto"
                    loop={true}
                >
                    {artist.instagram.members_instagram.map((member, memberIndex) => {
                        return (
                            <SwiperSlide
                                key={`members-${memberIndex}`}
                                className='shrink-0 h-full max-w-[150px] md:max-w-[200px] xl:max-w-[300px] mr-5 md:mr-8 xl:mr-24 select-none'
                            >
                                <MemberItem
                                    folder={artist.assets_folder_name}
                                    thumbnail={member.account_thumbnail}
                                    hashtag={member.hashtag}
                                    total_followers={member.total_followers}
                                    url={member.url}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <AiOutlineInstagram className='bg-instagram' size="100%" />
            </div>
            <div className='instagram-stats__container space-y-10 py-[10vh] lg:py-[20v]'>
                <h2>
                    <AnimatedTextReveal
                        target='.instagram-stats__title'
                        charClass='instagram-stats__title-char'
                        className='instagram-stats__title font-heading-2 inline-block'
                    >
                        Instagram Statistics
                    </AnimatedTextReveal>
                </h2>
                <div className='instagram-stats__wrapper'>
                    <InstagramGraph />
                </div>
            </div>
            <div className='social-media-cards__container'>
                <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-20'>
                    {artist.social_media_info.map((info, infoIndex) => {
                        return (
                            <SocialMediaCard key={`card-${infoIndex}`} index={infoIndex} {...info} />
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
