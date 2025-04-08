import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../model/types';

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    clearUsers(state) {
      state.users = [];
    }
  },
});

export const { setUsers, clearUsers } = userSlice.actions;
export default userSlice.reducer;