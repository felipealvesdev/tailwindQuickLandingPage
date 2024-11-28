import { ThemeContextProvider } from '@/context/theme-context'
import { ReactNode } from 'react'

function AppProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeContextProvider>{children}</ThemeContextProvider>
    )
}

export default AppProvider