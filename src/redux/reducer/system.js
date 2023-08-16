import { OTPSender } from '@common'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    expandKeno: true,
    expandBasic: true,
    alertKeno: true,
    alertTesting: true,
    alertCart: true,

    popupId: 0,

    surchargeLKK: 0,
    kenoSurchargeLKK: 0,

    kenoSalesStoppageTime: 0,

    otpSender: OTPSender.VOICE_OTP
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
        savePopupId: (state, action) => {
            state.popupId = action.payload.popupId || state.popupId
        },
        saveKenoStoptime: (state, action) => {
            state.kenoSalesStoppageTime = action.payload.kenoSalesStoppageTime !== 0 ?
                (action.payload.kenoSalesStoppageTime || newState.kenoSalesStoppageTime) : 0
        },
        saveOTPSender: (state, action) => {
            state.otpSender = action.payload.otpSender || state.otpSender
        },
    },
})

export const { saveExpandKeno, saveExpandBasic,
    saveAlertKeno, saveAlertTesting,
    saveSurchargeLKK, saveAlertCart,
    savePopupId, saveKenoStoptime,
    saveOTPSender } = systemSlice.actions
export default systemReducer = systemSlice.reducer