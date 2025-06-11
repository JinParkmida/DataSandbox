import React from 'react'
import { motion } from 'framer-motion'
import AnimatedTextReveal from '../AnimatedTextReveal';
import Counter from '../Counter';
import LazyImage from '../LazyImage';

type Props = {
  total_views: number;
  title: string;
  date_published: string;
  url: string;
  thumbnail: string;
  folder: string;
  index: number | string;
}

export default function VideoStats({
  total_views, title,
  date_published, url,
  thumbnail, folder, index
}: Props) {
  return (
    <motion.div 
      className='video-stats__wrapper pb-10'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: typeof index === 'number' ? index * 0.1 : 0 }}
    >
      <div className='video-stats__container relative'>
        <Counter
          className='video-stats__views text-[clamp(20px,3vw,28px)] inline-block mb-3'
          from={100000}
          to={total_views}
          duration={2}
        />
        <motion.a 
          className='video-stats__thumbnail-wrapper block'
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <figure>
            <LazyImage 
              src={require(`../../assets/${folder}/${thumbnail}`)} 
              alt={title}
              className='video-stats__thumbnail rounded-lg w-full shadow-md hover:shadow-lg transition-shadow duration-300'
            />
            <figcaption className='text-left'>
              <AnimatedTextReveal
                target={`.video-stats__caption-${index}`}
                charClass={`video-stats__caption-${index}-char`}
                className={`video-stats__caption-${index} mt-4 uppercase text-[clamp(16px,3vw,20px)] inline-block`}
              >
                {title}
              </AnimatedTextReveal>
            </figcaption>
          </figure>
        </motion.a>
        <p className='absolute -bottom-10 left-0 text-[clamp(16px,3vw,20px)]'></p>
        <p className='absolute -bottom-10 left-0 overflow-hidden'>
          <AnimatedTextReveal
            target={`.video-stats__published-date-${index}`}
            charClass={`video-stats__published-date-${index}-char`}
            className={`video-stats__published-date-${index} text-[clamp(16px,3vw,20px)]`}
          >
            {`Published: ${date_published}`}
          </AnimatedTextReveal>
        </p>
      </div>
    </motion.div>
  )
}