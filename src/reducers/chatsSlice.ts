import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { ChatInterface } from '@/interface/global'

// Define a type for the slice state
interface ContactsState {
  chatsList: ChatInterface[]
}

// Define the initial state using that type
const initialState: ContactsState = {
  chatsList: [],
}

export const chatsSlice = createSlice({
  name: 'chatsList',
  initialState,
  reducers: {
    setChatsData(state, action: PayloadAction<[]>) {
      state.chatsList = action.payload
    },
    addNewChat(state, action: PayloadAction<ChatInterface>) {
      state.chatsList.unshift(action.payload)
    },
    deleteChat(state, action: PayloadAction<string>) {
      state.chatsList = [
        ...state.chatsList.filter((chat) => chat.id !== action.payload),
      ]
    },
  },
})

export const { setChatsData, addNewChat, deleteChat } = chatsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAllChats = (state: RootState) => state.chatsList.chatsList
export const selectCurrChat = (state: RootState, chatId: string | undefined) =>
  state.chatsList.chatsList.find((chat: any) => chat.id === chatId)

export default chatsSlice.reducer
