import { Typography } from '@components/common'
import useAuth from '@hooks/useAuth'
import { formatDate } from '@utils/formatDate'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface ChatCardProps {
  data: {
    id: string
    name?: string
    avatar?: string
    isGroup: Boolean
    members: [
      { email: string; id: string; name: string; role: string; avatar?: string }
    ]
    latestMessage?: { content?: string; updatedAt: string }
  }
}

const ChatCard = ({ data }: ChatCardProps) => {
  const { userData } = useAuth()

  const { id, name, avatar, isGroup, members, latestMessage } = data

  const otherMember = members.filter((user) => user.id !== userData?.id)
  const otherUserNameInChat = otherMember.map((user) => user.name)

  const chatName = name || otherUserNameInChat.join(', ')

  return (
    <NavLink
      to={id}
      className={({ isActive }) =>
        `p-2 mx-1 rounded-lg ${
          isActive ? ' active' : 'hover:bg-gray-400 dark:hover:bg-gray-600'
        }`
      }
    >
      <div className="flex gap-4">
        <div>
          {avatar || (!isGroup && otherMember[0]?.avatar) ? (
            <img
              src={isGroup ? avatar : otherMember[0]?.avatar}
              alt={isGroup ? name : otherMember[0].name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full flex justify-center items-center bg-blue-500 text-white text-xl font-medium">
              {chatName.slice(0, 1)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <Typography className="font-normal">{chatName}</Typography>
            {latestMessage && (
              <Typography className="text-sm text-gray-700 dark:text-gray-400">
                {formatDate(latestMessage.updatedAt)}
              </Typography>
            )}
          </div>

          <Typography className="text-sm text-gray-700 dark:text-gray-400">
            {/* {latestMessage?.content || '...'} */}
            {latestMessage?.content}
          </Typography>
        </div>
      </div>
    </NavLink>
  )
}

export default ChatCard
