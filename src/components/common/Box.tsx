import React from 'react'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  component?: 'div' | 'nav' | 'section'
}

const Box: React.FC<React.PropsWithChildren<BoxProps>> = ({
  children,
  className,
  component = 'div',
  ...props
}) => {
  const Element = component

  return (
    <Element
      className={`bg-gray-200 dark:bg-gray-800 ${className || ''}`}
      {...props}
    >
      {children}
    </Element>
  )
}

export default Box
