import { Button, Input } from '@common'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import WrapperAuthPage from './WrapperAuthPage'
import { toast } from 'react-toastify'
import { resetPasswordApi } from '@/api/authApi'
import { useNavigate, useParams } from 'react-router-dom'

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), '', undefined], 'Passwords must match')
    .required('Confirm password is required'),
})

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const { resetToken } = useParams()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    if (!resetToken) return
    toast
      .promise(
        resetPasswordApi(resetToken, data),
        {
          pending: 'Loading',
          success: 'Success change password, redirect to login in 2 seconds',
          error: {
            render({ data }: any) {
              return data?.message
            },
          },
        },
        {}
      )
      .then(() => setTimeout(() => navigate('/', { replace: true }), 3000))
  }

  return (
    <WrapperAuthPage title="Reset Password">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit">Reset Password</Button>
      </form>
    </WrapperAuthPage>
  )
}

export default ResetPasswordPage
