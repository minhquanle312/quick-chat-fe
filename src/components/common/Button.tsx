import React from 'react'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  type?: 'submit' | 'reset' | 'button'
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`text-base uppercase text-gray-100 dark:text-gray-800 flex justify-center items-center bg-blue-600 dark:bg-blue-300 border-none cursor-pointer rounded-md py-1 px-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
