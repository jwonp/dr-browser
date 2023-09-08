import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type RegisterState = {
  id: string;
  name: string;
  phone: string;
  password: string;
};
const initialState: RegisterState = {
  id: "",
  name: "",
  phone: "",
  password: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetRegister: (state) => {
      state.id = initialState.id;
      state.name = initialState.name;
      state.phone = initialState.phone;
      state.password = initialState.password;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setId, setName, setPhone, setPassword, resetRegister } =
  registerSlice.actions;
export const getRegister = (state: RootState) => state.register;
export default registerSlice.reducer;
