import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    expandKeno: true,
    expandBasic: true,
    alertKeno: true
}

// Create Redux state slice
const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        saveExpandKeno: (state, action) => {
            state.expandKeno = action.payload.expand
        },
        saveExpandBasic: (state, action) => {
            state.expandBasic = action.payload.expand
        },
        saveAlertKeno: (state, action) => {
            state.alertKeno = action.payload.expand
        },
    },
})

export const { saveExpandKeno, saveExpandBasic, saveAlertKeno } = systemSlice.actions
export default systemReducer = systemSlice.reducer