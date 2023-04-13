import React, { useState } from 'react'
import WrapperLeftMenu from './WrapperLeftMenu'
import { useQuery } from '@tanstack/react-query'
import useUserApi from '@/api/useUserApi'
import { Avatar, IconButton, Spinner, Typography } from '@common'
import { toast } from 'react-toastify'
import { UserInterface } from '@/interface/global'
import { BiPlus } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addNewChat, selectAllContacts } from '@/reducers/contactsSlice'
import AddContactModal from './AddContactModal'
import useChatsApi from '@/api/useChatsApi'
// import { isEqual } from 'lodash'
import * as _ from 'lodash'
import { useNavigate } from 'react-router-dom'

interface ContactsProps extends React.HTMLAttributes<HTMLDivElement> {
  setMenuPage: any
}

const Contacts = ({ setMenuPage }: ContactsProps) => {
  const navigate = useNavigate()
  const { getCurrentUser } = useUserApi()
  const { createNewChat } = useChatsApi()
  const dispatch = useAppDispatch()
  const currentChatsList = useAppSelector((state) => selectAllContacts(state))

  const {
    isLoading,
    error,
    data: userInfo,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: getCurrentUser,
  })
  const [openAddContact, setOpenAddContact] = useState(false)

  if (error) toast.error('Error when loading contacts')

  const handleCreateChat = (contactInfo: any) => {
    const chatListExisted: any = currentChatsList.filter(
      (chat: any) => !chat.isGroup
    )

    const chatListMembers = chatListExisted.map((item: any) =>
      item.members.map((member: UserInterface) => member.id)
    )

    const membersForNewChat = [contactInfo.id, userInfo.id]

    let preventCreateChat = false

    chatListMembers.forEach((chatMember: string[], index: number) => {
      const valuesDiffer = _.difference(membersForNewChat, chatMember)
      if (valuesDiffer.length === 0) {
        setMenuPage('')
        navigate(`/chat/${chatListExisted[index].id}`)
        preventCreateChat = true
        return
      }
    })

    if (preventCreateChat) return

    toast
      .promise(createNewChat(membersForNewChat), {
        pending: 'Loading',
        success: 'Success',
        error: {
          render({ data }: any) {
            return data?.message as string | 'Error'
          },
        },
      })
      .then((res) => {
        res.data.members = [contactInfo, userInfo]
        dispatch(addNewChat(res.data))
        setMenuPage('')
        navigate(`/chat/${res.data.id}`)
      })
  }

  return (
    <WrapperLeftMenu
      setMenuPage={setMenuPage}
      title="Contacts"
      className="relative"
    >
      <AddContactModal
        open={openAddContact}
        onClose={() => setOpenAddContact(false)}
        currentUserData={userInfo}
      />
      {isLoading && <Spinner />}
      <div className="flex flex-col mt-2 gap-4 scroll-container">
        {userInfo?.contacts?.map((contact: UserInterface) => (
          <div
            key={contact.id}
            className="flex items-center gap-3 p-2 mx-1 rounded-lg cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
            onClick={() => handleCreateChat(contact)}
          >
            <Avatar
              isImage={!!contact.avatar}
              src={contact.avatar}
              alt={contact.name}
              name={contact.name}
            />
            <Typography className="text-lg">{contact.name}</Typography>
          </div>
        ))}
      </div>
      <IconButton
        className="absolute bottom-5 right-5 text-gray-200 bg-active h-12 w-12"
        onClick={() => setOpenAddContact(true)}
      >
        <BiPlus size={'1.2rem'} />
      </IconButton>
    </WrapperLeftMenu>
  )
}

export default Contacts
