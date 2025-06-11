import { motion, Variants } from 'framer-motion';
import { Fragment, useEffect } from 'react';
import AnimatedTextReveal from '../components/AnimatedTextReveal';
import Marquee from 'react-fast-marquee';
import useBreakpointValue from '../hooks/useBreakpointValue';
import { GiFlowerStar } from 'react-icons/gi';
import gsap from 'gsap';
import cn from 'classnames';
import { Link } from '@tanstack/react-location';
import { useDimensions } from '../providers/DimensionsProvider';

export default function Home() {
    const speed = useBreakpointValue({ base: 30, md: 20 }, { fallback: 'md' })
    const marqueeBts = document.querySelector('.marquee--bts');
    const marqueeBlackpink = document.querySelector('.marquee--blackpink');
    const { width, height } = useDimensions();

    const container: Variants = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.025,
                duration: 1
            }
        }
    };

    useEffect(() => {
        let vh = height * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }, [width]);


    useEffect(() => {
        const tl = gsap.timeline({ delay: 2, repeat: 0, defaults: { ease: "Power3.InOut", duration: 1 } });

        tl.to(marqueeBts, {
            clipPath: "inset(0% 0% 0% 0%)",
        })
        tl.to(marqueeBlackpink, {
            clipPath: "inset(0% 0% 0% 0%)",
        })

        if (marqueeBts && marqueeBlackpink) {
            tl.play();
        }

    }, [marqueeBts, marqueeBlackpink])


    return (
        <div className="home px-8 pb-16 pt-[15vh] h-screen-responsive relative">
            <div className='home__wrapper w-full h-full'>
                <section className="pt-20 container mx-auto">
                    <motion.div
                        className="p-4 relative"
                        initial="hidden"
                        animate="visible"
                        variants={container}
                    >
                        <div className="home-content bg-cream dark:bg-black space-y-9">
                            <h1>
                                <AnimatedTextReveal
                                    target='.home__title'
                                    charClass='home__title-char'
                                    className='home__title font-dm-serif text-[36px] sm:text-[50px] md:text-[60px] xl:text-[80px] xl:leading-[80px] 2xl:text-[5vw] 2xl:leading-[6vw]'
                                >
                                    Welcome to the KPOP data playground
                                </AnimatedTextReveal>
                            </h1>
                            <p className='sm:px-[20%]'>
                                <AnimatedTextReveal
                                    target='.home__sub-heading'
                                    charClass='home__sub-heading-char'
                                    className='home__sub-heading font-light md:text-[20px] md:leading-none xl:text-[30px]'
                                    animationDelay={1}
                                >
                                    Where you can find all data about your favourite KPOP groups & artists
                                </AnimatedTextReveal>
                            </p>
                        </div>
                    </motion.div>
                </section>
            </div>
            <div className='marquee__container absolute bottom-0 left-0 w-full h-[10vh]'>
                <div className='marquee__block relative w-full h-full'>
                    <Link
                        to='artist/bts'
                        className="marquee__line marquee--bts clip-inset-left max-w-[calc(100vw+200px)] absolute -left-[100px] bottom-[15vh] origin-left z-10"
                    >
                        <HomeMarquee
                            speed={speed}
                            artistName="bts"
                        />
                    </Link>
                    <Link
                        to='artist/blackpink'
                        className="marquee__line marquee--blackpink clip-inset-right max-w-[calc(100vw+200px)] absolute -right-[100px] bottom-[5vh] origin-right"
                    >
                        <HomeMarquee
                            speed={speed}
                            artistName="blackpink"
                            variant='outline'
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}
type HomeMarqueeProps = {
    speed: number | undefined;
    variant?: 'fill' | 'outline';
    artistName: string;
}
const HomeMarquee = ({ speed, artistName, variant = 'fill' }: HomeMarqueeProps) => {
    return (
        <Marquee
            gradient={false}
            speed={speed}
            className={cn("items-center overflow-hidden text-3xl md:text-4xl lg:text-5xl", {
                "bg-black dark:bg-cream text-cream dark:text-black": variant === "fill",
                "bg-cream dark:bg-black changing-border text-black dark:text-cream": variant === "outline",
            })}
            direction={variant === "fill" ? 'right' : 'left'}
        >
            {Array(10).fill(0).map((_, idx) => (
                <Fragment key={`marquee-bts-${idx}`}>
                    <GiFlowerStar className='mx-3' />
                    <span
                        className='space-x-2 mt-2 flex place-content-center uppercase'
                    >
                        <span className='font-light'>click and discover</span>
                        <span className='font-semibold'>{artistName}</span>
                    </span>
                </Fragment>
            ))}
        </Marquee>
    )
}
