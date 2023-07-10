import { createSlice } from '@reduxjs/toolkit'
import { doNotExits } from '@utils'

const initialState = {
  accessToken: "",
  remember: true,
  phoneNumber: "",
  password: ""
}

// Create Redux state slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.accessToken = action.payload.token
      state.phoneNumber = doNotExits(action.payload.phoneNumber) ? state.phoneNumber : action.payload.phoneNumber
      state.password = doNotExits(action.payload.password) ? state.password : action.payload.password
    },
    removeToken: (state) => {
      state.accessToken = ""
      state.phoneNumber = ""
      state.password = ""
    },
  },
})

export const { updateToken, removeToken } = authSlice.actions
export default authReducer = authSlice.reducer