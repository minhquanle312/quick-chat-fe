import useChatsApi from '@api/useChatsApi'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import ChatCard from './ChatCard'
import { Spinner } from '@common'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectAllContacts, setContactsData } from '@/reducers/contactsSlice'
import useClickOutSide from '@/hooks/useClickOutSide'
import useGetElementCoords from '@/hooks/useGetElementCoords'
import { Popover } from '@common'
import { AiOutlineMenu } from 'react-icons/ai'
import EditProfiles from './components/EditProfiles'
import useAuth from '@/hooks/useAuth'
import Contacts from './components/Contacts'

type MenuPage = 'editProfiles' | 'contacts' | ''

const ChatList: React.FC<React.ComponentProps<'div'>> = () => {
  const { getChatList } = useChatsApi()
  const dispatch = useAppDispatch()
  const contacts = useAppSelector((state) => selectAllContacts(state))
  const [menuPage, setMenuPage] = useState<MenuPage>('')

  const { isLoading, error, data } = useQuery({
    queryKey: ['chatList'],
    queryFn: () => getChatList(),
  })

  const letMenu = {
    editProfiles: {
      element: <EditProfiles setMenuPage={setMenuPage} />,
    },
    contacts: {
      element: <Contacts setMenuPage={setMenuPage} />,
    },
  }

  useEffect(() => {
    if (data?.data) dispatch(setContactsData(data.data))
  }, [data]) // eslint-disable-line

  // * Popover
  const [isShowSettings, setIsShowSettings] = useState<boolean>(false)
  const { nodeRef } = useClickOutSide(() => setIsShowSettings(false))
  const { coords, elmRef, handleGetElementCoords } = useGetElementCoords()
  const handleToggleSettings = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsShowSettings((s) => !s)
    handleGetElementCoords(e)
  }
  // * ####################

  if (menuPage !== '') return letMenu[menuPage].element

  return (
    <nav className="flex flex-col w-3/12 text-primary p-3">
      <div className="py-1 my-1">
        <div
          ref={nodeRef}
          className="relative flex-center w-10 h-10 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer rounded-full select-none"
          onClick={handleToggleSettings}
        >
          <div ref={elmRef}>
            <AiOutlineMenu size={'1.2rem'} />
          </div>
          {isShowSettings && (
            <Popover
              coords={coords}
              position="left"
              className="bg-gray-300 dark:bg-gray-700 rounded-md shadow w-[230px] p-2"
            >
              <SettingsContent setMenuPage={setMenuPage} />
            </Popover>
          )}
        </div>
      </div>
      <div className="flex flex-col h-full scroll-container">
        {isLoading && <Spinner />}
        {!!error && 'An error has occurred'}
        {data &&
          contacts?.map((chat: any) => <ChatCard key={chat.id} data={chat} />)}
      </div>
    </nav>
  )
}

function SettingsContent({ setMenuPage }: any) {
  const { logout } = useAuth()
  return (
    <>
      <div className="flex flex-col">
        <p
          onClick={() => setMenuPage('editProfiles')}
          className="font-medium px-2 py-1 rounded-sm text-gray-900 dark:text-gray-200 block cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Edit Profiles
        </p>
        <p
          onClick={() => {
            setMenuPage('contacts')
          }}
          className="font-medium px-2 py-1 rounded-sm text-gray-900 dark:text-gray-200 block cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Contacts
        </p>
        <p
          onClick={() => logout()}
          className="font-medium px-2 py-1 rounded-sm text-gray-900 dark:text-gray-200 block cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Logout
        </p>
      </div>
    </>
  )
}

export default ChatList
