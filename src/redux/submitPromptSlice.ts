import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SubmitPromptState {
  hide_text: boolean;
  message: string;
  isloading: boolean;
}

const initialState: SubmitPromptState = {
  hide_text: false,
  message: "",
  isloading: false,
};

 const submitPromptSlice = createSlice({
  name: "submitPrompt",
  initialState,
  reducers: {
   submit_hide_text: (state, payload: PayloadAction<boolean>) => {
    state.hide_text = payload.payload;
   },
   set_message: (state, payload: PayloadAction<string>) => {
    state.message = payload.payload;
  },
  set_Loading: (state, payload: PayloadAction<boolean>) => {
    state.hide_text = payload.payload;
  },
  }
 })
export const { submit_hide_text, set_message, set_Loading } = submitPromptSlice.actions;
export default submitPromptSlice.reducer;