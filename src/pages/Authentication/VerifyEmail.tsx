import { Box, Spinner, Typography } from '@/components/common'
import useAuth from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyEmail = () => {
  const { emailToken } = useParams()
  const { verifyEmail } = useAuth()
  const navigate = useNavigate()

  const fetchVerifyEmail = async () => {
    if (emailToken) {
      try {
        await verifyEmail(emailToken)
        navigate('/chat', { replace: true })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchVerifyEmail()
  }, []) // eslint-disable-line

  if (emailToken)
    return (
      <Box className="w-full px-2 md:w-1/2 lg:w-1/3 max-w-md">
        <Typography
          component="h4"
          className="text-xl font-semibold text-center"
        >
          Verifying your email
        </Typography>
        <Spinner />
      </Box>
    )

  return (
    <Box className="w-full px-2 md:w-1/2 lg:w-1/3 max-w-md">
      <Typography component="h3" className="text-3xl font-semibold text-center">
        Check your email (and spam folder) to verify account
      </Typography>
    </Box>
  )
}

export default VerifyEmail
