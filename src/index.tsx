import {
  AuthenticationPage,
  ErrorPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmail,
} from '@pages'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
// import './styles/_index.scss'
import Chat from '@components/Chat/Chat'
import { AuthProvider } from '@context/AuthContext'
import { ProtectedLayout } from '@layouts/ProtectedLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { IconContext } from 'react-icons'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import './index.css'
import { store } from './store/store'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AuthenticationPage /> },
      { path: 'verify-email', element: <VerifyEmail /> },
      { path: 'verify-email/:emailToken', element: <VerifyEmail /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password/:resetToken', element: <ResetPasswordPage /> },
      {
        path: 'chat',
        element: <ProtectedLayout />,
        children: [
          {
            path: ':chatId',
            element: <Chat />,
          },
        ],
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <IconContext.Provider
              value={{ style: { verticalAlign: 'middle' }, size: '1.6rem' }}
            >
              <RouterProvider router={router} />
            </IconContext.Provider>
          </AuthProvider>
          <ToastContainer />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
