import axios, { handleAxiosError } from './axios'

export interface LoginBody {
  email: string
  password: string
}

export interface ResetPasswordBody {
  password: string
  passwordConfirm: string
}

export interface SignUpBody {
  name: string
  email: string
  role?: string
  password: string
  passwordConfirm: string
}

export const login = async (body: LoginBody) => {
  const response = await axios.post('/users/login', JSON.stringify(body), {
    withCredentials: true,
  })
  return response.data
}

export const signUp = async (body: SignUpBody) => {
  const response = await axios.post('/users/signup', JSON.stringify(body), {
    withCredentials: true,
  })

  return response.data
}

export const verifyEmailApi = async (emailToken: string) => {
  const response = await axios.get(`/users/validateEmail/${emailToken}`)

  return response.data
}

export const forgotPasswordApi = async (email: string) => {
  try {
    const response = await axios.post(
      `/users/forgotPassword`,
      JSON.stringify({ email })
    )

    return response.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

export const resetPasswordApi = async (
  resetToken: string,
  body: ResetPasswordBody
) => {
  try {
    const response = await axios.patch(
      `/users/resetPassword/${resetToken}`,
      JSON.stringify(body)
    )

    return response.data
  } catch (error) {
    return handleAxiosError(error)
  }
}
