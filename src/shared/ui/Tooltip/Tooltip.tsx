import type { ReactNode } from 'react'

import styles from './Tooltip.module.css'
import { TooltipContent } from './TooltipContent.tsx'
import { TooltipPosition } from './TooltipPosition.ts'
import { useTooltip } from './useTooltip.ts'

interface TooltipProps {
  content: ReactNode
  position?: TooltipPosition
  children: ReactNode
}

export const Tooltip = ({ content, position = TooltipPosition.Top, children }: TooltipProps) => {
  const tooltip = useTooltip({ position })

  return (
    <span className={styles.trigger} {...tooltip.triggerProps}>
      {children}
      <TooltipContent coords={tooltip.coords} position={tooltip.position} content={content} />
    </span>
  )
}
