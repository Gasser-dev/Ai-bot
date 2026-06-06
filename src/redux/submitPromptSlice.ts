import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SubmitPromptState {
  hide_text: boolean;
  message: string;
  isloading: boolean;
  response: string;
  chatHistory: { role: string; text: string }[];
}

const initialState: SubmitPromptState = {
  hide_text: false,
  message: "",
  isloading: false,
  response: "",
  chatHistory: [],
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
    state.isloading = payload.payload;
  },
  set_response: (state, payload: PayloadAction<string>) => {
    state.response = payload.payload;
  },
  add_to_chat_history: (state, payload: PayloadAction<{ role: string; text: string }>) => {
    state.chatHistory.push(payload.payload);
  }
 }}) 
export const { submit_hide_text, set_message, set_Loading, set_response, add_to_chat_history } = submitPromptSlice.actions;
export default submitPromptSlice.reducer;