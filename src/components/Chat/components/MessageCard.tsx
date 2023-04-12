import useAuth from '@/hooks/useAuth'
import { ChatInterface, MessageInterface } from '@/interface/global'
import { Avatar, Typography } from '@common'

interface MessageCardProps {
  data: MessageInterface
  currChat: ChatInterface | undefined
}

const MessageCard = ({ data, currChat }: MessageCardProps) => {
  const { userData } = useAuth()

  const sendUser = currChat?.members.find(
    (member) => member.id === data.sendUser
  )

  return (
    <div
      className={`flex gap-2 ${
        userData && data.sendUser === userData.id ? 'self-end' : 'self-start'
      } items-start max-w-[40%]`}
    >
      {userData && data.sendUser !== userData.id && currChat?.isGroup && (
        <Avatar
          isImage={!!sendUser?.avatar}
          src={sendUser?.avatar}
          name={sendUser?.name}
          size={10}
        />
      )}
      <Typography
        className={`px-2 py-1 rounded-lg bg-gray-400 dark:bg-gray-600`}
      >
        {data?.content}
      </Typography>
    </div>
  )
}

export default MessageCard
