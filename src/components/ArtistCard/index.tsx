import cn from "classnames";
import { Variants, motion } from "framer-motion";

interface ArtistCardProps {
    src: string,
    alt: string,
    className?: string,
    side: 'left' | 'right',
    children?: React.ReactNode
}

const ArtistCard = ({ src, alt, className, side, children }: ArtistCardProps) => {
    const container: Variants = {
        hidden: {
            opacity: 0,
            x: side === "right" ? 50 : -50,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8
            }
        }
    };
    return (
        <motion.figure
            className={cn(
                `uppercase text-2xl flex items-center relative`,
                className,
                {
                    'flex-row-reverse ml-[40px]': side === "left",
                    'mr-[40px]': side === "right",
                }
            )}
            initial="hidden"
            animate="visible"
            variants={container}
        >
            <motion.img
                src={src}
                alt={alt}
                className="rounded-md max-w-[120px] aspect-video object-cover"
                whileHover={{ scale: 1.05 }}
            />
            <figcaption
                className={cn(
                    'absolute',
                    {
                        'writing-rl orientation-mixed -right-[40px]': side === "right",
                        'writing-lr orientation-mixed rotate-180 -left-[40px]': side === "left",
                    }
                )}
            >
                {children}
            </figcaption>
        </motion.figure>
    )
}

export default ArtistCard