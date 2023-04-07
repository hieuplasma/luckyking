import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    powerFirstDraw: "",
    powerListDraw: [],

    megaFirstDraw: "",
    megaListDraw: [],

    max3dFirstDraw: "",
    max3dListDraw: []
}

// Create Redux state slice
const drawSlice = createSlice({
    name: 'draw',
    initialState,
    reducers: {
        getPowerDraw: (state, action) => {
            state.powerFirstDraw = action.payload[0]
            state.powerListDraw = action.payload
        },
        getMegaDraw: (state, action) => {
            state.megaFirstDraw = action.payload[0]
            state.megaListDraw = action.payload
        },
        getMax3dDraw: (state, action) => {
            state.max3dFirstDraw = action.payload[0]
            state.max3dListDraw = action.payload
        },
    },
})

export const { getPowerDraw, getMegaDraw, getMax3dDraw } = drawSlice.actions
export default drawReducer = drawSlice.reducer