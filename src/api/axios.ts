import axios, { AxiosError, isAxiosError } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const handleAxiosError = (error: AxiosError | any) => {
  if (isAxiosError(error))
    return Promise.reject(error.response?.data || 'Unknown Error')
  else return error as string
}

export default instance
