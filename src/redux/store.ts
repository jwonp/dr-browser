import { configureStore } from "@reduxjs/toolkit";
import drawerSwitchReducer from "./featrues/drawerSwitchSlice";
import selectedRoomReducer from "./featrues/selectedRoomSlice";
import reservationEditReducer from "./featrues/reservationEditSlice";
export const store = configureStore({
  reducer: {
    drawerSwitch: drawerSwitchReducer,
    selectedRoom: selectedRoomReducer,
    reservationEdit: reservationEditReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

