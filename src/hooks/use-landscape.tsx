"use client";

import * as React from "react"

const LANDSCAPE_BREAKPOINT = 1024

export function useIsLandscape() {
  const [isLandscape, setIsLandscape] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkLandscape = () => {
      const isLandscapeOrientation = window.innerWidth > window.innerHeight
      const isAboveBreakpoint = window.innerWidth >= LANDSCAPE_BREAKPOINT
      setIsLandscape(isLandscapeOrientation && isAboveBreakpoint)
    }

    const mql = window.matchMedia(`(min-width: ${LANDSCAPE_BREAKPOINT}px)`)
    const onChange = () => {
      checkLandscape()
    }
    
    mql.addEventListener("change", onChange)
    checkLandscape()
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isLandscape
}

export const useLandscapeValues = () => {
  const isLandscape = useIsLandscape()
  
  return {
    isLandscape,
    cardWidth: isLandscape ? 540 : 480,
    cardHeight: isLandscape ? 720 : 640,
    cardGap: isLandscape ? 24 : 20,
    visibleCards: isLandscape ? 2 : 3,
    titleFontSize: isLandscape ? '2rem' : '2rem',
    logoSize: isLandscape ? '180px' : '180px',
    containerPadding: isLandscape ? 48 : 40,
  }
}




