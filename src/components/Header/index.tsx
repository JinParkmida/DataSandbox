import { Link } from '@tanstack/react-location'
import { IoIosStar } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'
import { Variants } from 'framer-motion'
import { useArtist } from '../../providers/ArtistProvider'
import { GiCircle } from 'react-icons/gi'
import DarkModeSwitcher from '../DarkModeSwitcher'


export default function Header() {
  const { artist } = useArtist();

  // Framer Motion variant object, for controlling animation
  const item: Variants = {
    initial: {
      y: 200,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 1.2 }
    },
    animate: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 1.2 }
    },
    exit: {
      y: 200,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 1.2 }
    }
  };

  const container: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.05,
        duration: 1
      }
    },
    hidden: {
      transition: {
        staggerChildren: 0.05,
        duration: 1
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-screen px-4 sm:px-8 py-6 z-20">
      <div className="flex flex-nowrap items-center justify-between">
        <div className="flex-none flex items-center">
          <Link
            to="artists"
            className="text-2xl md:text-lg inline-flex items-center font-light space-x-2"
          >
            <IoSearchOutline title="Search" />
            <span className='text-sm md:leading-none md:text-base invisible -translate-x-10 opacity-0 sm:visible sm:translate-x-0 sm:opacity-100 transition-all duration-500'>Search</span>
          </Link>
        </div>
        <div className="relative flex-none flex items-center justify-center h-14 -ml-12">
          <h2>
            <Link to="/" className="logo">
              <span className="text-sm md:text-base bg-cream dark:bg-black font-dm-serif">
                K <IoIosStar className="inline pb-1" /> STAR
              </span>
              <GiCircle className='aspect-square w-[100%] h-[100%] absolute top-0 bottom-0 left-1/2 right-0 -translate-x-1/2 -skew-x-[40deg] origin-center -z-[1]' />
            </Link>
          </h2>
        </div>
        <div className="flex-none z-10">
          <DarkModeSwitcher />
        </div>
      </div>
    </header>
  )
}
