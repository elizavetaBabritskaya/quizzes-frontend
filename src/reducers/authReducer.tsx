import {createSlice} from "@reduxjs/toolkit";

export type AuthStateType = {
    authorized: boolean;
    error:[]
}

export type ErrorAuth = {
    text: string;
    status: number
}

const initialState: AuthStateType = {
    authorized: false,
    error:[]
}

export const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        UPDATE_AUTH: (state, action) => {
            state.authorized = action.payload
        },
        SET_ERROR: (state, action) => {
            state.error = action.payload
        }
    },
});
export const {UPDATE_AUTH, SET_ERROR} = authReducer.actions;
export default authReducer.reducer;