import { useCallback, useEffect, useRef, useState } from 'react'

import type { ConfirmDialogOptions, ConfirmDialogProps } from './ConfirmDialog.tsx'

export const useConfirmDialog = () => {
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null)
  const resolverRef = useRef<((result: boolean) => void) | null>(null)

  const settle = useCallback((result: boolean) => {
    resolverRef.current?.(result)
    resolverRef.current = null
    setOptions(null)
  }, [])

  const showConfirmDialog = useCallback(
    (dialogOptions: ConfirmDialogOptions): Promise<boolean> => {
      resolverRef.current?.(false)

      return new Promise<boolean>((resolve) => {
        resolverRef.current = resolve
        setOptions(dialogOptions)
      })
    },
    [],
  )

  const handleConfirm = useCallback(() => settle(true), [settle])
  const handleCancel = useCallback(() => settle(false), [settle])

  const isOpen = options !== null

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const { style } = document.documentElement
    const prevOverflow = style.overflow
    const prevPaddingRight = style.paddingRight

    style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      style.overflow = prevOverflow
      style.paddingRight = prevPaddingRight
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleCancel, isOpen])

  const dialogProps: ConfirmDialogProps = {
    options,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  }

  return { showConfirmDialog, dialogProps }
}
