import { RoomPreviewType } from "@/src/chat/types/room";
import { UserType } from "@/src/app/types/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  modalOpened: boolean;
  currentOtherUser: UserType | null;
  newChat: boolean;
  rooms: RoomPreviewType[];
}

const initialState: ChatState = {
  modalOpened: false,
  currentOtherUser: null,
  newChat: false,
  rooms: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpened = action.payload;
    },
    setCurrentOtherUser: (state, action: PayloadAction<UserType | null>) => {
      state.currentOtherUser = action.payload;
    },
    setNewChat: (state, action: PayloadAction<boolean>) => {
      state.newChat = action.payload;
    },
    setRooms: (state, action: PayloadAction<RoomPreviewType[]>) => {
      state.rooms = action.payload;
    },
    clearChat: (state) => {
      state.modalOpened = false;
      state.currentOtherUser = null;
      state.newChat = false;
      state.rooms = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setModal,
  setCurrentOtherUser,
  setNewChat,
  setRooms,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
