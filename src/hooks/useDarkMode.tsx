import React from 'react'
import useMutationObservable from './useMutationObservable';

type ReturnProps = {
    isDarkMode: boolean;
    switchMode: () => void;
}

function useDarkMode(): ReturnProps {
    const bodyElement = document.querySelector("body") as HTMLBodyElement;
    const initialState = bodyElement.classList.contains('dark');
    const [isDarkMode, setIsDarkMode] = React.useState(initialState);

    const onClassNameMutation = React.useCallback((mutationList: MutationRecord[]) => {
        if (mutationList[0].attributeName === "class") {
            const targetMutated = mutationList[0].target as HTMLBodyElement;
            const hasDarkClass = targetMutated.classList.contains('dark');
            setIsDarkMode(hasDarkClass);
            localStorage.setItem('theme', hasDarkClass ? 'dark' : 'light')
        }

    }, [isDarkMode])

    const switchMode = () => {
        bodyElement.classList.toggle('dark');
        localStorage.setItem('theme', bodyElement.classList.contains('dark') ? 'dark' : 'light');
    }

    useMutationObservable(bodyElement, onClassNameMutation)

    return {
        isDarkMode,
        switchMode
    }
}

export default useDarkMode;