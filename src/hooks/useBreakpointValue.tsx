import React from 'react'
import { useCurrentBreakpointName } from 'react-socks'
import { isObject } from 'underscore';

type UseBreakpointValueOptions = {
    fallback?: string
}

export default function useBreakpointValue<T = any>(
    breakpointValues: Partial<Record<string, T>>,
    arg?: UseBreakpointValueOptions | string
): T | undefined {
    const currentBreakpoint = useCurrentBreakpointName();

    const [value, setValue] = React.useState<typeof breakpointValues.base>(undefined);
    const opts = isObject(arg) ? arg : { fallback: arg ?? "base" };

    React.useEffect(() => {
        if (!breakpointValues) return console.warn("useBreakpointValue should be an object");
        if (!breakpointValues[currentBreakpoint]) setValue(breakpointValues[opts.fallback || "base"]);
        if (breakpointValues[currentBreakpoint]) setValue(breakpointValues[currentBreakpoint]);
    }, [currentBreakpoint])

    return value
}