import React from 'react'

const DEFAULT_OPTIONS = {
    config: { attributes: true, childList: false, subtree: false },
};


function useMutationObservable(targetEl: Node, callback: MutationCallback, options: typeof DEFAULT_OPTIONS = DEFAULT_OPTIONS) {
    const [observer, setObserver] = React.useState<MutationObserver | null>(null);

    React.useEffect(() => {
        const obs = new MutationObserver(callback);
        setObserver(obs);
    }, [callback, options, setObserver]);

    React.useEffect(() => {
        if (!observer) return;
        const { config } = options;
        observer.observe(targetEl, config);
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [observer, targetEl, options]);
}

export default useMutationObservable;