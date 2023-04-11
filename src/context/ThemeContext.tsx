import { createContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextProps {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
})

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>((): Theme => {
    const currentStorageTheme: Theme | null = localStorage.getItem(
      'theme'
    ) as Theme | null
    return currentStorageTheme || 'light'
  })

  useEffect(() => {
    const html = document.querySelector('html')
    if (theme === 'dark') html?.classList.add('dark')
    else html?.classList.remove('dark')
  }, [theme])

  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
