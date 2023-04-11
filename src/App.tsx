import { Box, IconButton } from '@common'
import useTheme from '@hooks/useTheme'
import React from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'
import { Outlet } from 'react-router-dom'

const App: React.FC<React.ComponentProps<'div'>> = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Box
      className={`flex justify-center items-center h-screen min-h-screen relative`}
    >
      <Outlet />
      <IconButton
        className={`bg-gray-300 dark:bg-gray-600 text-gray-900 absolute bottom-5 left-5 text-sm [&>svg]:text-gray-800 [&>svg]:dark:text-gray-200`}
        onClick={() => toggleTheme()}
      >
        {theme === 'light' ? <BsMoon className="text-4xl" /> : <BsSun />}
      </IconButton>
    </Box>
  )
}

export default App
