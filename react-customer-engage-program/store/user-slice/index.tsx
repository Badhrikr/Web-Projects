import { createSlice } from "@reduxjs/toolkit";
import { UserStore } from "../model";

const initialState: UserStore = {
  userLoggedIn: false,
  accessToken: "",
  //   refreshToken: localStorageData.refreshTokenId,
  //   user: user,
};

function setUser(state: UserStore, action: any) {
  state.userLoggedIn = true;
  state.accessToken = action.payload;
}

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: { setUser },
});

export default userSlice;
