import { Button, Input, Typography } from '@common'
import React from 'react'
import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useAuth from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

interface SignUpPageProps extends React.HTMLAttributes<HTMLFormElement> {
  togglePage: () => void
}

const schema = yup.object().shape({
  name: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), '', undefined], 'Passwords must match')
    .required('Confirm password is required'),
})

const SignUpPage: React.FC<SignUpPageProps> = ({ togglePage }) => {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    signUp(data)
    navigate('/chat', { replace: true })
  }

  return (
    <form className={'flex flex-col gap-5'} onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="name"
        label="Username"
        error={errors.name?.message as string | undefined}
      />
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
      <Input
        control={control}
        name="passwordConfirm"
        label="Confirm Password"
        type="password"
        error={errors.passwordConfirm?.message as string | undefined}
      />
      <Typography
        className="text-sm text-blue-600 dark:text-blue-400 underline cursor-pointer select-none"
        onClick={togglePage}
      >
        Already have an account? Login
      </Typography>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default SignUpPage
