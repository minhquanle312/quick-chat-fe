import React from 'react'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
}

const IconButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`flex-center rounded-full p-2 ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton
