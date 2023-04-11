import React, { useState } from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import { Box, Typography } from '@common'

const AuthenticationPage = () => {
  const [page, setPage] = useState('login')

  const togglePage = () => {
    setPage((prev) => (prev === 'login' ? 'signUp' : 'login'))
  }

  return (
    <Box className="w-full px-2 md:w-1/2 lg:w-1/3 max-w-md">
      <Typography component="h3" className="text-3xl font-semibold text-center">
        {page === 'login' ? 'Login' : 'Sign Up'}
      </Typography>
      {page === 'login' ? (
        <LoginPage togglePage={togglePage} />
      ) : (
        <SignUpPage togglePage={togglePage} />
      )}
    </Box>
  )
}

export default AuthenticationPage
