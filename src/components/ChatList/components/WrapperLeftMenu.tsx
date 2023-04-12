import { Typography } from '@/components/common'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

const WrapperLeftMenu: React.FC<
  React.PropsWithChildren<{
    setMenuPage: any
    title?: string
    className?: string
  }>
> = ({ children, setMenuPage, title, className = '' }) => {
  const { chatId } = useParams()

  return (
    <div
      className={`flex flex-col left-menu-width ${
        !chatId ? 'tab-active' : ''
      } text-primary p-3 ${className}`}
    >
      <div className="flex items-center py-1 my-1 border-b border-gray-500">
        <div
          className="flex justify-center items-center w-10 h-10 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer rounded-full select-none"
          onClick={() => setMenuPage('')}
        >
          <BsArrowLeft size={'1.2rem'} />
        </div>
        <Typography className="text-xl font-medium">{title}</Typography>
      </div>
      {children}
    </div>
  )
}

export default WrapperLeftMenu
