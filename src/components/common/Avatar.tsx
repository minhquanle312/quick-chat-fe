type Props = {
  isImage: Boolean
  src: string | undefined
  alt?: string
  name?: string
  size?: number
}

const Avatar = ({ isImage, src, alt, name, size = 12 }: Props) => {
  const chatName = name || 'A'

  return (
    <div>
      {isImage ? (
        <img
          src={src}
          alt={alt}
          className={`w-${size} h-${size} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`w-${size} h-${size} rounded-full flex justify-center items-center bg-blue-500 text-white text-xl font-medium`}
        >
          {chatName.slice(0, 1)}
        </div>
      )}
    </div>
  )
}

export default Avatar
