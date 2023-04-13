import { Button, Input } from '@common'
import { useForm } from 'react-hook-form'

import { forgotPasswordApi } from '@/api/authApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import WrapperAuthPage from './WrapperAuthPage'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
})

const ForgotPasswordPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    toast.promise(forgotPasswordApi(data.email), {
      pending: 'Sending reset password email',
      success: 'Success',
      error: {
        render({ data }: any) {
          return data?.message
        },
      },
    })
  }

  return (
    <WrapperAuthPage title="Forgot Password">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="email"
          label="Email"
          error={errors.email?.message as string | undefined}
        />
        <Button type="submit">Send Reset Password Link</Button>
      </form>
    </WrapperAuthPage>
  )
}

export default ForgotPasswordPage
