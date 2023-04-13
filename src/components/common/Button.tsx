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
    <button className={`base-button ${className || ''}`} {...props}>
      {children}
    </button>
  )
}

export default Button
