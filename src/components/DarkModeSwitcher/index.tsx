import { motion } from 'framer-motion'
import { TbNorthStar, TbMoonStars } from 'react-icons/tb'
import useDarkMode from '../../hooks/useDarkMode'

type Props = {}

export default function DarkModeSwitcher({ }: Props) {
    const { switchMode, isDarkMode } = useDarkMode();

    return (
        <motion.button
            onClick={switchMode}
            className="text-sm inline-flex items-center changing-border rounded-full p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                key={isDarkMode ? 'dark' : 'light'}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {isDarkMode ? <TbMoonStars title="dark-mode" /> : <TbNorthStar title="light-mode" />}
            </motion.div>
        </motion.button>
    )
}