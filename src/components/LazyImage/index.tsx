import React, { useState } from 'react'
import LazyLoad from 'react-lazyload'
import cn from 'classnames'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: React.ReactNode
  aspectRatio?: string
}

export default function LazyImage({ 
  src, 
  alt, 
  className, 
  placeholder,
  aspectRatio = "aspect-video"
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleLoad = () => setLoaded(true)
  const handleError = () => setError(true)

  return (
    <LazyLoad height={200} offset={100} once>
      <div className={cn("relative overflow-hidden", aspectRatio, className)}>
        {!loaded && !error && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
            {placeholder || (
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Failed to load image</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
        )}
      </div>
    </LazyLoad>
  )
}