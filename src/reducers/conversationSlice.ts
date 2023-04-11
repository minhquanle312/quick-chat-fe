import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './../store/store'
import { MessageInterface } from '@/interface/global'

// Define a type for the slice state
interface ConversationState {
  data: MessageInterface[]
}

// Define the initial state using that type
const initialState: ConversationState = {
  data: [],
}

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversationData(state, action: PayloadAction<MessageInterface[]>) {
      state.data = action.payload
    },
    addMessageToConversation(state, action: PayloadAction<MessageInterface>) {
      state.data.push(action.payload)
    },
    // addMessageToConversation(state, action: PayloadAction<MessageInterface>) {
    //   if (action?.payload) state.data.push(action.payload)
    // },
  },
})

export const { setConversationData, addMessageToConversation } =
  conversationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectConversation = (state: RootState) => state.conversation.data

export default conversationSlice.reducer
