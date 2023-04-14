import { Box, Button, Input, Typography } from '@common'
import React from 'react'
import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useAuth from '@hooks/useAuth'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

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
  const { login } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    toast.promise(login(data), {
      pending: 'Loading',
      success: 'Login success',
      error: {
        render({ data }: any) {
          return typeof data.message === 'string' && data.message
            ? data.message
            : 'An unexpected error'
        },
      },
    })
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
        <Link to="/forgot-password">
          <Typography className="text-blue-600 dark:text-blue-400 underline cursor-pointer select-none">
            Forgot password?
          </Typography>
        </Link>
        <Typography
          className="text-blue-600 dark:text-blue-400 underline cursor-pointer select-none"
          onClick={togglePage}
        >
          Don't have an account? Sign Up
        </Typography>
      </Box>
      <Button type="submit" className="py-2">
        Login
      </Button>
      <Typography>
        If this is first time you use this web, can be take too long for first
        request because free server suspense when no action in long time
      </Typography>
      <Typography>
        Please sign up with your real email (valid and existed email) because
        verify token with send to your mail (I use nodemailer + Gmail)
      </Typography>
      <span className="text-red-500">
        Sorry for your bad experience when using website because UI and some
        features in developing process (but all authentication feature work well
        in this version)
      </span>
      <Typography>Or you can use test email below:</Typography>
      <Typography>user3@example.com (pass: 12345678)</Typography>
      <Typography>user4@example.com (pass: 12345678)</Typography>
    </form>
  )
}

export default LoginPage
