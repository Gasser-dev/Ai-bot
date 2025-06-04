import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  users: string[];
  loggedIn: boolean;
}
const initialState: UserState = {
  users: [],
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    rdx_login: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;

  }
}})
export const { rdx_login } = userSlice.actions;
export default userSlice.reducer;