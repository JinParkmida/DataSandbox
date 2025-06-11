import React from 'react';
import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import SplitType from 'split-type';
import gsap from 'gsap';

type Props = {
    target: string | HTMLElement | ArrayLike<HTMLElement> | (HTMLElement | ArrayLike<HTMLElement>);
    charClass: string | undefined;
    wordClass?: string | undefined;
    className?: string | undefined;
    children: React.ReactChildren | React.ReactChild;
    animationDelay?: number;
}

export default function AnimatedTextReveal({ target, charClass, wordClass, className, children, animationDelay = 0.4 }: Props) {
    const [ref, inView] = useInView({ threshold: 0, triggerOnce: true, delay: 100 });

    React.useEffect(() => {
        if (charClass) {
            const splitter = new SplitType(target, {
                types: "words, chars",
                charClass: cn('translate-y-full', charClass),
                wordClass: cn("overflow-hidden", wordClass)
            })
            if (inView) {
                gsap.to(`.${charClass}`, {
                    y: 0,
                    ease: "0.455, 0.03, 0.515, 0.955",
                    stagger: 0.025,
                    delay: animationDelay,
                })
            }
        }
    }, [inView])

    return (
        <span ref={ref} className={cn(className)}>{children}</span>
    )
}