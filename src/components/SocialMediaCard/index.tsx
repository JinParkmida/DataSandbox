import { motion } from "framer-motion"
import Counter from "../Counter"

type Props = {
    index: number,
    social_media: string,
    account: string,
    total_followers: number,
    new_followers_today: number
}

export default function SocialMediaCard({ index, social_media, account, total_followers, new_followers_today }: Props) {
    return (
        <motion.li 
            key={`social-media-card-${index}`} 
            className='relative aspect-video w-full changing-border z-[1] rounded-lg overflow-hidden'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            <motion.a 
                href="http://" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='grid place-content-center h-full w-full space-y-3 px-5 py-8 bg-cream dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300'
                whileHover={{ scale: 1.01 }}
            >
                <div className='font-bold'>
                    <p className='text-base text-gray-600 dark:text-gray-400'>{social_media}</p>
                    <h4 className='text-xl font-semibold'>{account}</h4>
                </div>
                <div className='font-light grid space-y-1'>
                    <span className='text-sm text-gray-700 dark:text-gray-300'>
                        Total followers: <Counter
                        className='text-sm font-semibold text-black dark:text-cream'
                        from={100000}
                        to={total_followers}
                        duration={2}
                    /></span>
                    <span className='text-sm text-gray-700 dark:text-gray-300'>
                        New today: <Counter
                        className='text-sm font-semibold text-green-600 dark:text-green-400'
                        from={1}
                        to={new_followers_today}
                    /></span>
                </div>
            </motion.a>
            <span className='absolute -bottom-2 -right-2 bg-black dark:bg-cream w-full h-full -z-[1] rounded-lg' />
        </motion.li>
    )
}