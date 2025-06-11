import { TbNorthStar, TbMoonStars } from 'react-icons/tb'
import useDarkMode from '../../hooks/useDarkMode'

type Props = {}

export default function DarkModeSwitcher({ }: Props) {
    const { switchMode, isDarkMode } = useDarkMode();

    return (
        <button
            onClick={switchMode}
            className="text-sm inline-flex items-center changing-border rounded-full p-2"
        >
            {isDarkMode ? <TbMoonStars title="dark-mode" /> : <TbNorthStar title="light-mode" />}
        </button>
    )
}