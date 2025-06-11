import { useEffect } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import Marquee from "react-fast-marquee";
import useBreakpointValue from '../hooks/useBreakpointValue';
import MenuLink from '../components/MenuLink';

type MenuItemType = {
    label: string;
    slug: string;
}

const menuItems: MenuItemType[] = [
    { label: "Girls' Generation", slug: "girls-generation" },
    { label: "BlackPink", slug: "blackpink" },
    { label: "BTS", slug: "bts" },
    { label: "NCT 127", slug: "nct-127" }
]

type Props = {}

export default function ArtistMenu({ }: Props) {

    useEffect(() => {
        gsap.fromTo('.menu__artist--line', {
            yPercent: 200,
            skewY: 10,
        }, {
            yPercent: 0,
            skewY: 0,
            ease: "power3.inOut",
            duration: 0.8,
            stagger: 0.2
        })
    }, [])

    const speed = useBreakpointValue({ base: 50, md: 20 }, { fallback: 'md' })
    return (
        <div className='menu w-screen h-screen overflow-hidden'>
            <section className='menu__container w-full h-full mx-auto py-[20vh] lg:py-[10vh]'>
                <ul className='menu__block flex flex-col items-stretch h-full'>
                    {menuItems.map(({ label, slug }, menuIndex) => {
                        return (
                            <li key={`menu-item-${menuIndex}`} className='menu__column h-1/4 w-auto text-center relative flex items-center justify-center font-dm-serif'>
                                <MenuLink menuLabel={label} slug={slug} />
                                <Marquee
                                    style={{ position: 'absolute' }}
                                    className='left-0 top-0 h-full text-[90px] sm:text-[125px] xl:text-[220px] opacity-5 md:opacity-0 overflow-hidden select-none peer-hover:opacity-5 transition-opacity'
                                    gradient={false}
                                    speed={speed}
                                    direction={(menuIndex % 2 === 0) ? "left" : "right"}
                                >
                                    {Array(10).fill(label).map((marquee, idx) => <span key={`marquee-${marquee}-${idx}`} className='uppercase mx-5'>{marquee}</span>)}
                                </Marquee>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </div>
    )
}