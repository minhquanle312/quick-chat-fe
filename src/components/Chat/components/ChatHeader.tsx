import useAuth from '@/hooks/useAuth'
import { ChatInterface } from '@/interface/global'
import { selectCurrContact } from '@/reducers/contactsSlice'
import { useAppSelector } from '@/store/hooks'
import { Box, Typography } from '@common'
import { RxDotsVertical } from 'react-icons/rx'
import { useParams } from 'react-router-dom'
// import useClickOutSide from '@/hooks/useClickOutSide'
// import useGetElementCoords from '@/hooks/useGetElementCoords'
// import Popover from '../common/Popover'

const ChatHeader = () => {
  const { userData } = useAuth()
  // const { getConversation } = useChatsApi()
  const { chatId } = useParams()
  // const dispatch = useAppDispatch()
  const currChat: ChatInterface | undefined = useAppSelector((state) =>
    selectCurrContact(state, chatId)
  )

  // * Popover
  // const [isShowSettings, setIsShowSettings] = useState<boolean>(false)
  // const { nodeRef } = useClickOutSide(() => setIsShowSettings(false))
  // const { coords, elmRef, handleGetElementCoords } = useGetElementCoords()
  // const handleToggleSettings = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   setIsShowSettings((s) => !s)
  //   handleGetElementCoords(e)
  // }
  // * ####################

  if (!currChat) {
    return null // or return a loading/error component
  }

  const { name, avatar, isGroup, members } = currChat
  const otherMember = (members as Array<any>)?.filter(
    (user: any) => user.id !== userData?.id
  )
  const otherUserNameInChat = otherMember.map((user: any) => user.name)

  const chatName = name || otherUserNameInChat.join(', ')

  // const { data: conversation } = data || {}

  return (
    <Box className="flex items-center border-l border-gray-300 dark:border-gray-500 p-3">
      <div>
        {avatar || (!isGroup && otherMember[0]?.avatar) ? (
          <img
            src={isGroup ? avatar : otherMember[0]?.avatar}
            alt={isGroup ? name : otherMember[0].name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-blue-500 text-white text-xl font-medium">
            {(chatName as string)?.slice(0, 1)}
          </div>
        )}
      </div>
      <Typography className="ml-3 text-lg font-medium">{chatName}</Typography>
      <div className="action ml-auto text-gray-900 dark:text-gray-200">
        <div
          // ref={nodeRef}
          className="relative flex-center w-10 h-10 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer rounded-full"
          // onClick={handleToggleSettings}
        >
          {/* <div ref={elmRef}> */}
          <div>
            <RxDotsVertical size={'1.2rem'} />
          </div>
          {/* {isShowSettings && (
              <Popover
                coords={coords}
                position="right"
                className="bg-white rounded-2xl shadow w-[230px] py-6 px-5"
              >
                <SettingsContent></SettingsContent>
              </Popover>
            )} */}
        </div>
      </div>
    </Box>
  )
}

export default ChatHeader
