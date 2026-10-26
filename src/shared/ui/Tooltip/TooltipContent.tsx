import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

import { TooltipPosition } from './TooltipPosition.ts'
import type { TooltipCoords } from './useTooltip.ts'
import styles from './Tooltip.module.css'

const TOOLTIP_ROOT_ID = 'tooltip-root'

interface TooltipContentProps {
  content: ReactNode
  position: TooltipPosition
  coords: TooltipCoords | null
}

const getTooltipRoot = (): HTMLElement => document.getElementById(TOOLTIP_ROOT_ID) ?? document.body

export const TooltipContent = ({ content, position, coords }: TooltipContentProps) => {
  if (coords === null) {
    return null
  }

  return createPortal(
    <div
      className={`${styles.tooltip} ${styles[position]}`}
      style={{ left: coords.left, top: coords.top }}
    >
      {content}
    </div>,
    getTooltipRoot(),
  )
}
