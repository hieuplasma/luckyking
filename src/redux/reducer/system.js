import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    expandKeno: true,
    expandBasic: true,
    alertKeno: true,
    alertTesting: true,

    surchargeLKK: 0
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
        saveAlertTesting: (state, action) => {
            state.alertTesting = action.payload.expand
        },
        saveSurchargeLKK: (state, action) => {
            state.surchargeLKK = action.payload.surcharge
        }
    },
})

export const { saveExpandKeno, saveExpandBasic, saveAlertKeno, saveAlertTesting, saveSurchargeLKK } = systemSlice.actions
export default systemReducer = systemSlice.reducer