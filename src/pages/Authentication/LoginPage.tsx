import { Box, Button, Input, Typography } from '@common'
import React from 'react'
import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useAuth from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'

interface LoginPageProps extends React.HTMLAttributes<HTMLFormElement> {
  togglePage: () => void
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const LoginPage: React.FC<LoginPageProps> = ({ togglePage }) => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    login(data)
    navigate('/chat', { replace: true })
  }

  return (
    <form className={'flex flex-col gap-5'} onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Email"
        error={errors.email?.message as string | undefined}
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        error={errors.password?.message as string | undefined}
      />
      <Box className="flex flex-col sm:flex-row justify-between text-sm ">
        <Typography className="text-blue-600 dark:text-blue-400 underline cursor-pointer select-none">
          Forgot password?
        </Typography>
        <Typography
          className="text-blue-600 dark:text-blue-400 underline cursor-pointer select-none"
          onClick={togglePage}
        >
          Don't have an account? Sign Up
        </Typography>
      </Box>
      <Button type="submit" className="py-2">
        Submit
      </Button>
    </form>
  )
}

export default LoginPage
