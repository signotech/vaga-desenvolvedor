import {createSlice} from "@reduxjs/toolkit";
import { api } from "@utils/api";

type USER_REDUCER = {
	token: string | null,
    authenticated: boolean
}

const initialState: USER_REDUCER = {
	token: null,
    authenticated:false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser(state, action) {
			state.token = action.payload.token
            state.authenticated = true
		},
        setSignOut(state){
            state.token = null
            state.authenticated = false
        }
	}
})

export const {setCurrentUser, setSignOut} = userSlice.actions
export const userReducer = userSlice.reducer