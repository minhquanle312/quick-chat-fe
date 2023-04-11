import useAuth from '@hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import { Box } from '../components/common'
import ChatList from '@/components/ChatList/ChatList'

export const ProtectedLayout = () => {
  const { userData } = useAuth()
  // const outlet = useOutlet();

  if (!userData) {
    return <Navigate to="/" />
  }

  return (
    <Box className="flex w-full h-full">
      <Box className="flex w-full h-full">
        <ChatList />
        <Outlet />
      </Box>
    </Box>
  )
}
