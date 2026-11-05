import { useContext } from 'react'

import { ThemeContext, type ThemeContextValue } from './ThemeContext.tsx'

export const useTheme = (): ThemeContextValue => useContext(ThemeContext)
