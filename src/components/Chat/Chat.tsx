/* eslint-disable no-self-compare */
import useAuth from '@/hooks/useAuth'
import useChatsApi from '@api/useChatsApi'
import { IconButton, Spinner, Typography } from '@common'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from './components/ChatHeader'
import { BsFillSendFill } from 'react-icons/bs'
import { io } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addMessageToConversation,
  selectConversation,
  setConversationData,
} from '@/reducers/conversationSlice'
import { MessageInterface } from '@/interface/global'

const Chat: React.FC<React.ComponentProps<'div'>> = () => {
  const { userData } = useAuth()
  const dispatch = useAppDispatch()
  const conversation = useAppSelector((state) => selectConversation(state))
  const { getConversation, createNewMessage } = useChatsApi()
  const { chatId } = useParams()

  const messageRef = useRef<HTMLInputElement>(null)
  const latestMessage = useRef<HTMLDivElement>(null)

  const [socket, setSocket] = useState<any>()

  const { isLoading, error, data } = useQuery({
    queryKey: ['chatList', chatId],
    queryFn: () => getConversation(chatId),
  })

  const scrollToBottom = () => {
    latestMessage.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (data?.data) dispatch(setConversationData(data.data))
  }, [data]) // eslint-disable-line

  useEffect(() => {
    const s = io(process.env.REACT_APP_SOCKET_URL || 'http://127.0.0.1:3001')
    setSocket(s)

    function onReceiveMessage(value: MessageInterface) {
      dispatch(addMessageToConversation(value))
      // scrollToBottom()
    }

    s.on('receive-message', onReceiveMessage)

    return () => {
      s.disconnect()
      s.off('receive-message', onReceiveMessage)
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (socket == null || chatId == null) return

    socket.emit('get-chat-room', chatId)
  }, [socket, chatId])

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  const handleSendMessage = async () => {
    const message = messageRef?.current?.value
    if (!message || message?.length === 0) return

    const messageData: MessageInterface = {
      chat: chatId,
      content: message,
      sendUser: userData?.id,
      createAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      const body = { content: messageRef?.current?.value }
      const res = await createNewMessage(chatId, body)

      messageData.id = res.data.id

      socket.emit('send-message', messageData)
      dispatch(addMessageToConversation(messageData))

      messageRef.current.value = ''
      messageRef.current.focus()
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      {!!error && 'An error has occurred'}
      <ChatHeader />
      <div className="flex flex-col max-w-2xl mx-auto h-chat-content justify-end pb-5">
        <div className="flex flex-col gap-3 my-5 h-full scroll-container">
          {isLoading && (
            <Spinner overrideClass="[&>.loader:after]:bg-gray-300 [&>.loader:after]:dark:bg-gray-500" />
          )}

          {conversation?.map((chat: MessageInterface) => (
            <Typography
              key={chat?.id}
              className={`${
                userData && chat.sendUser === userData.id
                  ? 'self-end'
                  : 'self-start'
              } max-w-[40%] px-2 py-1 rounded-lg bg-gray-400 dark:bg-gray-600`}
            >
              {chat?.content}
            </Typography>
          ))}
          <div ref={latestMessage}></div>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={messageRef}
            type="text"
            className="p-3 bg-gray-400 dark:bg-gray-600 outline-none border-none rounded-lg text-primary flex-1"
            onKeyDown={handleKeyDown}
          />
          <IconButton
            className="text-gray-200 bg-active h-12 w-12"
            onClick={handleSendMessage}
          >
            <BsFillSendFill size={'1.2rem'} />
          </IconButton>
        </div>
      </div>
    </>
  )
}

export default Chat
