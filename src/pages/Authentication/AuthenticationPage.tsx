import useAuth from '@/hooks/useAuth'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import WrapperAuthPage from './WrapperAuthPage'

const AuthenticationPage = () => {
  const [page, setPage] = useState('login')
  // const { accessToken } = useAuth()
  const { userData } = useAuth()

  const togglePage = () => {
    setPage((prev) => (prev === 'login' ? 'signUp' : 'login'))
  }

  return (
    <WrapperAuthPage title={page === 'login' ? 'Login' : 'Sign Up'}>
      {userData && <Navigate to="/chat" replace={true} />}
      {page === 'login' ? (
        <LoginPage togglePage={togglePage} />
      ) : (
        <SignUpPage togglePage={togglePage} />
      )}
    </WrapperAuthPage>
  )
}

export default AuthenticationPage
