import axios from 'axios'

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

export default instance
