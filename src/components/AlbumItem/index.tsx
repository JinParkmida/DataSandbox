import React from 'react'
import { motion } from 'framer-motion'
import Counter from '../Counter';
import LazyImage from '../LazyImage';

type Props = {
    folder: string,
    thumbnail: string,
    title: string;
    info: string;
    released_date: string;
    total_sales: number;
}

export default function AlbumItem({ folder, thumbnail, title, info, released_date, total_sales }: Props) {
    return (
        <motion.li 
            className="flex flex-row gap-6 md:gap-8 flex-nowrap p-4 md:p-6 rounded-lg changing-border bg-cream dark:bg-black hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='grid place-content-center'>
                <LazyImage 
                    src={require(`../../assets/${folder}/${thumbnail}`)} 
                    alt={title}
                    className='max-w-[80px] md:max-w-[100px] lg:max-w-[140px] xl:max-w-[160px] rounded-md'
                    aspectRatio="aspect-square"
                />
            </div>
            <div className='grid w-full text-left space-y-1'>
                <h4 className='text-base lg:text-lg font-bold mb-2 uppercase tracking-wide'>{title}</h4>
                <span className='text-xs lg:text-sm text-gray-600 dark:text-gray-400'>{info}</span>
                <span className='text-xs lg:text-sm text-gray-600 dark:text-gray-400'>
                    Released: <time className="font-medium">{released_date}</time>
                </span>
                <span className='text-sm lg:text-base font-semibold mt-3 text-black dark:text-cream'>
                    Total sales: <Counter
                    from={1}
                    to={total_sales}
                    className="font-bold"
                /></span>
            </div>
        </motion.li>
    )
}