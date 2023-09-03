import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DrawerSwitchState {
  switch: boolean;
}

const initialState: DrawerSwitchState = {
  switch: false,
};

export const drawerSwitchSlice = createSlice({
  name: "drawerSwitch",
  initialState,
  reducers: {
    turnOn: (state) => {
      state.switch = true;
    },
    turnOff: (state) => {
      state.switch = false;
    },
    setSwitch: (state, action: PayloadAction<boolean>) => {
      state.switch = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { turnOn, turnOff, setSwitch } = drawerSwitchSlice.actions;
export const getDrawerSwitch = (state: RootState) => state.drawerSwitch.switch;
export default drawerSwitchSlice.reducer;
