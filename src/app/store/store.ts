import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '../../entities/User/api/userApi';
import userReducer from '../../entities/User/api/userSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;