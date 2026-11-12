import { useState, type MouseEvent } from 'react'

import { TooltipPosition } from './TooltipPosition.ts'

const GAP_PX = 8

export interface TooltipCoords {
  left: number
  top: number
}

export interface TooltipTriggerProps {
  onMouseEnter: (event: MouseEvent<HTMLElement>) => void
  onMouseLeave: (event: MouseEvent<HTMLElement>) => void
}

interface UseTooltipOptions {
  position?: TooltipPosition
}

const getCoords = (rect: DOMRect, position: TooltipPosition): TooltipCoords => {
  switch (position) {
    case TooltipPosition.Top:
      return { left: rect.left + rect.width / 2, top: rect.top - GAP_PX }
    case TooltipPosition.Bottom:
      return { left: rect.left + rect.width / 2, top: rect.bottom + GAP_PX }
    case TooltipPosition.Left:
      return { left: rect.left - GAP_PX, top: rect.top + rect.height / 2 }
    case TooltipPosition.Right:
      return { left: rect.right + GAP_PX, top: rect.top + rect.height / 2 }
  }
}

export const useTooltip = ({ position = TooltipPosition.Top }: UseTooltipOptions = {}) => {
  const [coords, setCoords] = useState<TooltipCoords | null>(null)

  const triggerProps: TooltipTriggerProps = {
    onMouseEnter: (event) => {
      setCoords(getCoords(event.currentTarget.getBoundingClientRect(), position))
    },
    onMouseLeave: () => {
      setCoords(null)
    },
  }

  return {
    position,
    coords,
    isOpen: coords !== null,
    triggerProps,
  }
}
