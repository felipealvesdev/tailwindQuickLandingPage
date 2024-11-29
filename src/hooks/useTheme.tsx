import { ThemeContext, ThemeContextProps } from '@/context/theme-context'
import { useContext } from 'react'

function useTheme(): ThemeContextProps {
    const context = useContext(ThemeContext)
  return (
    context
  )
}

export default useTheme