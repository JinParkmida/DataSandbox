import React from 'react'
import AnimatedTextReveal from '../AnimatedTextReveal';
import Counter from '../Counter';

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
    <div className='video-stats__wrapper pb-10'>
      <div className='video-stats__container relative'>
        <Counter
          className='video-stats__views text-[clamp(20px,3vw,28px)] inline-block mb-3'
          from={100000}
          to={total_views}
          duration={2}
        />
        <a className='video-stats__thumbnail-wrapper' href={url} target="_blank" rel="noopener noreferrer">
          <figure>
            <img className='video-stats__thumbnail rounded-md aspect-video object-cover w-full' src={require(`../../assets/${folder}/${thumbnail}`)} alt="" />
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
        </a>
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
    </div>
  )
}