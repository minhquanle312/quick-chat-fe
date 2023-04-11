import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './../store/store'

// Define a type for the slice state
interface ContactsState {
  contacts: []
}

// Define the initial state using that type
const initialState: ContactsState = {
  contacts: [],
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactsData(state, action: PayloadAction<[]>) {
      state.contacts = action.payload
    },
  },
})

export const { setContactsData } = contactsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAllContacts = (state: RootState) => state.contacts.contacts
export const selectCurrContact = (
  state: RootState,
  chatId: string | undefined
) => state.contacts.contacts.find((chat: any) => chat.id === chatId)

export default contactsSlice.reducer
