import { createElement, type ReactElement } from 'react'
import { capitalize } from './string.ts'

export * from './math.ts'
export * from './string.ts'

export function renderBadge(label: string): ReactElement {
  return createElement('span', { className: 'badge' }, capitalize(label))
}
