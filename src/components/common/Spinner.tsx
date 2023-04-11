import React from 'react'

interface SpinnerProps {
  text?: string
  size?: string
  className?: string
}

const Spinner = ({ text = '', size = '4em', className }: SpinnerProps) => {
  const header = text ? <h4>{text}</h4> : null
  return (
    <div
      className={`spinner [&>.loader:after]:bg-gray-200 [&>.loader:after]:dark:bg-gray-800 ${
        className || ''
      }`}
    >
      {header}
      <div className="loader" style={{ height: size, width: size }} />
    </div>
  )
}

export default Spinner
