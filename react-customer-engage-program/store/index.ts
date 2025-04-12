import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";

const reducer = combineReducers({
    user: userSlice.reducer,
});

const store = configureStore({
    reducer,
});

const STORE_ACTIONS = {
    user: userSlice.actions,
};

export { STORE_ACTIONS };
export default store;
