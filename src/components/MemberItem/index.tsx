import { motion } from 'framer-motion'
import Counter from '../Counter'
import LazyImage from '../LazyImage'
import { useSwiperSlide } from 'swiper/react';
import cn from 'classnames';

type Props = {
    folder: string,
    thumbnail: string,
    hashtag: string,
    total_followers: number,
    url: string
}

export default function MemberItem({ folder, thumbnail, hashtag, total_followers, url }: Props) {
    const swiperSlide = useSwiperSlide();

    return (
        <motion.a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={cn('grid gap-3 text-center transition-all duration-300 ease-linear grayscale hover:grayscale-0', {
            "grayscale-0": swiperSlide.isActive && !swiperSlide.isDuplicate
        })}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <figure className='grid h-fit gap-4'>
                <LazyImage 
                    src={require(`../../assets/${folder}/${thumbnail}`)} 
                    alt={hashtag}
                    className='w-full rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300'
                    aspectRatio="aspect-square"
                />
                <figcaption className='font-[clamp(12px,2vw,16px)] font-medium text-gray-700 dark:text-gray-300'>{hashtag}</figcaption>
            </figure>
            <Counter
                className='social-media-member__followers text-[clamp(22px,2vw,26px)] mb-4 font-bold'
                from={100000}
                to={total_followers}
                duration={2}
            />
        </motion.a>
    )
}