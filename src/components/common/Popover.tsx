import { Coords } from '@/types/global'
import React from 'react'
import { createPortal } from 'react-dom'

type PositionPopover = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export type AbsolutePosition = {
  x: number
  y: number
}

interface PopoverV2Props {
  open: Boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  coords?: Coords
  position?: PositionPopover
  absolutePosition?: AbsolutePosition
}

const Popover = ({
  coords,
  open,
  onClose,
  children,
  className,
  position = 'bottom-right',
  absolutePosition,
}: PopoverV2Props) => {
  let positionObject

  if (coords) {
    const { x, y, width, height } = coords

    positionObject = {
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
  }

  return open ? (
    <React.Fragment>
      {createPortal(
        <div
          style={
            absolutePosition
              ? { top: absolutePosition.y, left: absolutePosition.x }
              : positionObject
              ? positionObject[position]
              : { top: 0, left: 0 }
          }
          className={`base-popover ${className ? className : 'w-64 h-56'}`}
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
