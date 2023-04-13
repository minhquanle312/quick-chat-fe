import { Box, Typography } from '@common'
import React from 'react'

const WrapperAuthPage: React.FC<React.PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => {
  return (
    <Box className="w-full px-2 md:w-1/2 lg:w-1/3 max-w-md">
      <Typography component="h3" className="text-3xl font-semibold text-center">
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export default WrapperAuthPage
