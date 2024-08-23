import { createSlice, Slice } from "@reduxjs/toolkit";

export const userSlice: Slice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    create: (currentState, action) => {
      return { ...currentState, users: [...currentState.users, action.payload] };
    }
  },
});
