import React, { useEffect, useState } from 'react'
import { debounce } from 'underscore'

function useDebouncedResize() {
  const [windowSize, setWindowSize] = useState<{ width: number | undefined, height: number | undefined }>({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    //Call handler right away so state gets updated with initial window size
    handleResize();

    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    }
  }, [])

  return {
    windowSize
  }
}

export default useDebouncedResize
