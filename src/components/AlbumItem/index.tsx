import React from 'react'
import Counter from '../Counter';

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
        <li className="flex flex-row gap-8 flex-nowrap p-5">
            <div className='grid place-content-center'>
                <img src={require(`../../assets/${folder}/${thumbnail}`)} alt="" className='aspect-square object-cover max-w-[80px] md:max-w-[100px] lg:max-w-[140px] xl:max-w-[160px]' />
            </div>
            <div className='grid w-full text-left'>
                <h4 className='text-base lg:text-lg font-bold mb-2 uppercase'>{title}</h4>
                <span className='text-xs lg:text-base'>{info}</span>
                <span className='text-xs lg:text-base'>Released: <time>{released_date}</time></span>
                <span className='text-base lg:text-lg font-bold mt-2'>Total sales: <Counter
                    from={1}
                    to={total_sales}
                /></span>
            </div>
        </li>
    )
}