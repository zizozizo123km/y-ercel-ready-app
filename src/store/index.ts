import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import postsReducer from './postsSlice'
import notificationsReducer from './notificationsSlice'
import messengerReducer from './messengerSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
    messenger: messengerReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {user: UserState, posts: PostsState, notifications: NotificationsState, messenger: MessengerState}
export type AppDispatch = typeof store.dispatch

export default store