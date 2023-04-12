import React from 'react'
import { createPortal } from 'react-dom'
import IconButton from './IconButton'
import Typography from './Typography'
import { AiOutlineClose } from 'react-icons/ai'

interface ModalProps {
  open: Boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  title?: string
}

const Modal = ({ open, onClose, children, className, title }: ModalProps) => {
  // const [open, setOpen] = useState(true)

  return open ? (
    <React.Fragment>
      {createPortal(
        <div
          className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 dark:bg-slate-700 rounded-lg p-3 ${
            className ? className : 'w-64 h-56'
          }`}
        >
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => onClose()}
              className="h-10 w-10 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <AiOutlineClose
                size={'1.2rem'}
                className="text-gray-700 dark:text-gray-200"
              />
            </IconButton>
            {title ? (
              <Typography className="text-xl font-medium">{title}</Typography>
            ) : null}
          </div>
          {children}
        </div>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div
          onClick={() => onClose()}
          className="inset-0 absolute bg-gray-200 dark:bg-gray-800 opacity-50 "
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </React.Fragment>
  ) : null
}

export default Modal
