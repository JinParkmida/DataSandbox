import React, { RefObject } from "react"

interface IntersectionObserverProps {
  root: RefObject<HTMLElement> ,
  target: RefObject<HTMLElement>,
  onIntersect: () => any,
  threshold: number,
  rootMargin: string
}

export function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '50px',
}: IntersectionObserverProps) {
  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root: root && root.current,
      rootMargin,
      threshold,
    })

    const el = target && target.current

    if (!el) {
      return
    }

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  })
}
