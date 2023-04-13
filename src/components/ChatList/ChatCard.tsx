import { UserInterface } from '@/interface/global'
import { Avatar, Button, Modal, Popover, Typography } from '@common'
import useAuth from '@hooks/useAuth'
import { formatDate } from '@utils/formatDate'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AbsolutePosition } from '../common/Popover'
import { MdDeleteOutline } from 'react-icons/md'
import useChatsApi from '@/api/useChatsApi'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@/store/hooks'
import { deleteChat } from '@/reducers/contactsSlice'

interface ChatCardProps {
  data: {
    id: string
    name?: string
    avatar?: string
    isGroup: Boolean
    members: UserInterface[]
    latestMessage?: { content?: string; updatedAt: string }
  }
}

const ChatCard = ({ data }: ChatCardProps) => {
  const { userData } = useAuth()
  const { deleteChatApi } = useChatsApi()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [showContextMenu, setShowContextMenu] = useState<Boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<Boolean>(false)
  const [contextMenuPosition, setContextMenuPosition] =
    useState<AbsolutePosition>({ x: 0, y: 0 })

  const { id, name, avatar, isGroup, members, latestMessage } = data

  const otherMember = members.filter((user) => user.id !== userData?.id)
  const otherUserNameInChat = otherMember.map((user) => user.name)

  const chatName = name || otherUserNameInChat.join(', ')

  const handleDeleteChat = () => {
    toast
      .promise(deleteChatApi(data.id), {
        pending: 'Deleting',
        success: 'Deleted',
        error: {
          render({ data }: any) {
            return data?.message
          },
        },
      })
      .finally(() => {
        setShowDeleteModal(false)
        dispatch(deleteChat(data.id))
        navigate('/chat', { replace: true })
      })
  }

  return (
    <NavLink
      to={id}
      className={({ isActive }) =>
        `p-2 mx-1 rounded-lg ${
          isActive ? ' active' : 'hover:bg-gray-400 dark:hover:bg-gray-600'
        }`
      }
      onContextMenu={(e) => {
        e.preventDefault()
        setShowContextMenu(true)
        setContextMenuPosition({ x: e.pageX, y: e.pageY })
      }}
    >
      <div className="flex gap-4">
        <Avatar
          isImage={Boolean(avatar || (!isGroup && otherMember[0]?.avatar))}
          src={isGroup ? avatar : otherMember[0]?.avatar}
          alt={isGroup ? name : otherMember[0].name}
          name={chatName}
        />
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
            {latestMessage?.content}
          </Typography>
        </div>
      </div>
      <Popover
        open={showContextMenu}
        onClose={() => setShowContextMenu(false)}
        absolutePosition={contextMenuPosition}
        className="bg-gray-300 dark:bg-gray-700 rounded-md shadow w-[230px] p-2"
      >
        <div className="flex flex-col">
          <p
            onClick={() => {
              setShowDeleteModal(true)
              setShowContextMenu(false)
            }}
            className="popover-selection flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-400 dark:hover:bg-opacity-20 hover:bg-opacity-30 text-red-700 dark:text-red-500 font-medium"
          >
            <MdDeleteOutline size={'1.2rem'} /> Delete Chat
          </p>
        </div>
      </Popover>
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Chat"
        className="w-80"
      >
        <Typography>
          Delete chat on all users. Delete on only current user is developing
        </Typography>
        <div className="flex justify-between items-center my-3">
          <Button
            onClick={() => setShowDeleteModal(false)}
            className="font-medium bg-transparent dark:bg-transparent text-blue-500 hover:bg-blue-500 hover:bg-opacity-20 dark:text-violet-500 dark:hover:bg-violet-500 dark:hover:bg-opacity-20"
          >
            CANCEL
          </Button>
          <Button
            onClick={handleDeleteChat}
            className="bg-transparent dark:bg-transparent text-red-700 hover:bg-red-700 hover:bg-opacity-20 dark:text-red-500 dark:hover:bg-red-500 dark:hover:bg-opacity-20 font-medium"
          >
            DELETE CHAT
          </Button>
        </div>
      </Modal>
    </NavLink>
  )
}

export default ChatCard
