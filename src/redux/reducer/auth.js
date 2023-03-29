import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: "",
}

// Create Redux state slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.accessToken = action.payload
    },
    removeToken: (state) => {
      state.accessToken = ""
    },
  },
})

export const { updateToken, removeToken } = authSlice.actions
export default authReducer = authSlice.reducer