import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const ROOM = "room";
export const USER = "user";
export const CARD = "card";
export interface reservationEditState {
  isVisible: boolean;
  type: "room" | "user" | "card";
  selectedReservationId: number;
}
const initialState: reservationEditState = {
  isVisible: false,
  type: CARD,
  selectedReservationId: 0,
};
type SelectReservationState = {
  type: "room" | "user" | "card";
  selectedReservationId: number;
};
export const reservationEditSlice = createSlice({
  name: "reservationEdit",
  initialState,
  reducers: {
    setSelectReservationState: (
      state,
      action: PayloadAction<SelectReservationState>
    ) => {
      state.isVisible = true;
      state.type = action.payload.type;
      state.selectedReservationId = action.payload.selectedReservationId;
    },
    setInvisible: (state) => {
      state.selectedReservationId = initialState.selectedReservationId;
      state.isVisible = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectReservationState, setInvisible } =
  reservationEditSlice.actions;
export const getReservationEditState = (state: RootState) =>
  state.reservationEdit;

export const getEditModalVisible = (state: RootState) =>
  state.reservationEdit.isVisible;
export default reservationEditSlice.reducer;
