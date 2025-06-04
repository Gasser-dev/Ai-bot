import { configureStore } from '@reduxjs/toolkit'
import submitPrompt from './submitPromptSlice.ts'
import userSlice from './userSlice.ts'
// ...

export const store = configureStore({
  reducer: {
    submitPrompt,
    userSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch