import React, { useEffect, useState } from 'react'
import { animate, AnimationPlaybackControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Props = {
    from?: number;
    to: number;
    duration?: number;
    className?: string;
    onComplete?: () => void,
    onPlay?: () => void,
}

export default function Counter({ from = 0, to, duration = 1, className = '', onComplete, onPlay }: Props) {
    const [counter, setCounter] = useState(from.toString());
    const [ref, inView] = useInView({ threshold: 0, triggerOnce: true, delay: 100 });

    const numberWithCommas = (x: number) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        let controls: AnimationPlaybackControls | undefined = undefined;
        if (inView) {
            controls = animate(from, to, {
                duration,
                onUpdate(value: number) {
                    setCounter(numberWithCommas(Math.ceil(value)))
                },
                onComplete,
                onPlay,
            });
        }

        return () => controls?.stop();
    }, [from, to, inView]);

    return <span ref={ref} {...{ className }}>{counter}</span>;
}