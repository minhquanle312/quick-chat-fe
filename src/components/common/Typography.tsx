import React from 'react'

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
  component?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  overrideClass?: Boolean
}

const Typography: React.FC<React.PropsWithChildren<TypographyProps>> = ({
  children,
  className,
  component = 'p',
  overrideClass = false,
  ...props
}) => {
  const Element = component

  return (
    <Element
      className={overrideClass ? className : `text-primary ${className || ''}`}
      {...props}
    >
      {children}
    </Element>
  )
}

export default Typography
