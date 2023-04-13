import { useEffect, useState } from 'react'

const useGetCoords = (elmRef: any) => {
  const [coords, setCoords] = useState<any>()

  const getPosition = () => {
    // const x = boxRef.current?.offsetLeft;
    // setX(x);

    // const y = boxRef.current?.offsetTop;
    // setY(y);
    const x = elmRef?.current?.offsetLeft
    const y = elmRef?.current?.offsetTop
    const width = elmRef?.current?.offsetWidth
    const height = elmRef?.current?.offsetHeight
    setCoords({ x, y, width, height })
  }

  useEffect(() => {
    getPosition()
  }, []) // eslint-disable-line

  useEffect(() => {
    window.addEventListener('resize', getPosition)

    return () => {
      window.removeEventListener('resize', getPosition)
    }
  }, []) // eslint-disable-line

  return coords
}

export default useGetCoords
