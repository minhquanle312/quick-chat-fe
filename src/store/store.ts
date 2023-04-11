import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from './../reducers/contactsSlice'
import conversationSlice from './../reducers/conversationSlice'

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
    conversation: conversationSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
