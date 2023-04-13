import useAuth from '@/hooks/useAuth'
import useGetCoords from '@/hooks/useGetCoords'
import { selectAllContacts, setContactsData } from '@/reducers/contactsSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import useChatsApi from '@api/useChatsApi'
import { Popover, Spinner, Toggle } from '@common'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import ChatCard from './ChatCard'
import Contacts from './components/Contacts'
import EditProfiles from './components/EditProfiles'
import useTheme from '@/hooks/useTheme'

type MenuPage = 'editProfiles' | 'contacts' | ''

const ChatList: React.FC<React.ComponentProps<'div'>> = () => {
  const { getChatList } = useChatsApi()
  const dispatch = useAppDispatch()
  const contacts = useAppSelector((state) => selectAllContacts(state))
  const [menuPage, setMenuPage] = useState<MenuPage>('')
  const { chatId } = useParams()

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
  const buttonRef: any = useRef()
  const buttonCoords = useGetCoords(buttonRef)

  if (menuPage !== '') return letMenu[menuPage].element

  return (
    <nav
      className={`flex flex-col left-menu-width ${
        !chatId ? 'tab-active' : ''
      } text-primary overflow-x-hidden`}
    >
      <div className="py-3 my-1">
        <div
          ref={buttonRef}
          className="relative flex-center w-10 h-10 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer rounded-full select-none"
          onClick={() => setIsShowSettings(true)}
        >
          <div>
            <AiOutlineMenu size={'1.2rem'} />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full scroll-container">
        {isLoading && <Spinner />}
        {!!error && 'An error has occurred'}

        {data &&
          contacts?.map((chat: any) => <ChatCard key={chat.id} data={chat} />)}
      </div>
      <Popover
        open={isShowSettings}
        onClose={() => setIsShowSettings(false)}
        coords={buttonCoords}
        className="bg-gray-300 dark:bg-gray-700 rounded-md shadow w-[230px] p-2"
      >
        <SettingsContent setMenuPage={setMenuPage} />
      </Popover>
    </nav>
  )
}

function SettingsContent({ setMenuPage }: any) {
  const { theme, toggleTheme } = useTheme()

  const { logout } = useAuth()
  return (
    <>
      <div className="flex flex-col">
        <div
          onClick={(e) => toggleTheme()}
          className="flex items-center select-none justify-between font-medium px-2 py-1 rounded-sm text-gray-900 dark:text-gray-200 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          <p>Dark mode</p> <Toggle checked={theme === 'dark'} />
        </div>
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
