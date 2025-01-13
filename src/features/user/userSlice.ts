import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  id: string | null,
  nickname: string | null,
  image: string | null,
  isLoggedIn: boolean,
};

const initialState: UserState = {
  id: null,
  nickname: null,
  image: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ id: string; nickname: string; image: string }>){
      console.log(action);
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.isLoggedIn = true;
    },
    logout(state){
      state.id = null;
      state.nickname = null;
      state.image = null;
      state.isLoggedIn = false;
    },
  },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;