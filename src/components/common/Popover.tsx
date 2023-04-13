import { Coords } from '@/types/global'
import React from 'react'
import { createPortal } from 'react-dom'

type PositionPopover = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

interface PopoverV2Props {
  open: Boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  coords?: Coords
  position?: PositionPopover
}

const Popover = ({
  coords,
  open,
  onClose,
  children,
  className,
  position = 'bottom-right',
}: PopoverV2Props) => {
  if (!coords) return null
  const { x, y, width, height } = coords

  const positionObject = {
    'top-right': {
      left: x,
      top: y - height,
      transform: 'translateY(-100%)',
    },
    'top-left': {
      top: y - height,
      left: x + width,
      transform: 'translate(-100%, -100%)',
    },
    'bottom-right': {
      top: y + height,
      left: x,
    },
    'bottom-left': {
      top: y + height,
      left: x + width,
      transform: 'translateX(-100%)',
    },
  }

  return open ? (
    <React.Fragment>
      {createPortal(
        <div
          style={positionObject[position]}
          className={`absolute z-10 bg-slate-200 dark:bg-slate-700 rounded-lg p-3 ${
            className ? className : 'w-64 h-56'
          }`}
        >
          {children}
        </div>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div
          onClick={() => onClose()}
          className="inset-0 absolute bg-transparent"
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </React.Fragment>
  ) : null
}

export default Popover
