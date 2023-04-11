import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { Box } from '@common'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <Box className="flex justify-center items-center min-h-screen text-primary">
      {isRouteErrorResponse(error) ? (
        <Box id="error-page">
          <h1>Oops! {error.status}</h1>
          <p>{error.statusText}</p>
          {error.data?.message && (
            <p>
              <i>{error.data.message}</i>
            </p>
          )}
        </Box>
      ) : (
        error instanceof Error && (
          <Box id="error-page">
            <h1>Oops! Unexpected Error</h1>
            <p>Something went wrong.</p>
            <p>
              <i>{error.message}</i>
            </p>
          </Box>
        )
      )}
    </Box>
  )
}

export default ErrorPage
