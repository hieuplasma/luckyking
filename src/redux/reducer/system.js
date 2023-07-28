import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    expandKeno: true,
    expandBasic: true,
    alertKeno: true,
    alertTesting: true,
    alertCart: true,

    surchargeLKK: 0,
    kenoSurchargeLKK: 0
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
        saveAlertCart: (state, action) => {
            state.alertCart = action.payload.expand
        },
        saveSurchargeLKK: (state, action) => {
            state.surchargeLKK = action.payload.surcharge || 0
            state.kenoSurchargeLKK = action.payload.kenoSurcharge || 0
        },
    },
})

export const { saveExpandKeno, saveExpandBasic,
    saveAlertKeno, saveAlertTesting,
    saveSurchargeLKK, saveAlertCart } = systemSlice.actions
export default systemReducer = systemSlice.reducer