import { AuthenticationPage, ErrorPage } from '@pages'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
// import './styles/_index.scss'
import Chat from '@components/Chat/Chat'
import { AuthProvider } from '@context/AuthContext'
import { ProtectedLayout } from '@layouts/ProtectedLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { IconContext } from 'react-icons'
import App from './App'
import './index.css'
import { store } from './store/store'
// import

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AuthenticationPage /> },
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
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
