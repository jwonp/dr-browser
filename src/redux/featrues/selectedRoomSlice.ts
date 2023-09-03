import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RoomSelectCardItem } from "@/assets/DataCard/templates/RoomSelectCard/RoomSelectCard";

const initialState: RoomSelectCardItem = {
  roomId: 0,
  address: "",
};

export const selectedRoomSlice = createSlice({
  name: "selectedRoom",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomSelectCardItem>) => {
      state.roomId = action.payload.roomId;
      state.address = action.payload.address;
    },
    setRoomId: (state, action: PayloadAction<number>) => {
      state.roomId = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    resetRoom: (state) => {
      state.roomId = initialState.roomId;
      state.address = initialState.address;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoom, setRoomId, setAddress, resetRoom } =
  selectedRoomSlice.actions;
export const getSelectedRoom = (state: RootState) => state.selectedRoom;
export default selectedRoomSlice.reducer;
