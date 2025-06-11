import { useNavigate } from '@tanstack/react-location';
import { useRef } from 'react'

type Props = {
    menuLabel: string;
    slug: string;
}

export default function MenuLink({ menuLabel, slug }: Props) {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate({ to: `/artist/${slug}` });
    }

    return (
        <a ref={linkRef} onClick={handleClick} className='menu__artist container flex items-center justify-center h-full cursor-pointer uppercase font-dm-serif tracking-wider text-2xl sm:text-[50px] xl:text-[120px] whitespace-nowrap peer z-[2] overflow-hidden'>
            <span className='menu__artist--line block skew-y-0 translate-y-0 opacity-100 origin-left'>
                {menuLabel}
            </span>
        </a>
    )
}