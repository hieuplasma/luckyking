import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    powerFirstDraw: "",
    powerListDraw: [],

    megaFirstDraw: "",
    megaListDraw: [],

    max3dFirstDraw: "",
    max3dListDraw: [],

    max3dProFirstDraw: "",
    max3dProListDraw: [],

    kenoFirstDraw: "",
    kenoListDraw: []
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
        getMax3dProDraw: (state, action) => {
            state.max3dProFirstDraw = action.payload[0]
            state.max3dProListDraw = action.payload
        },
        getKenoDraw: (state, action) => {
            state.kenoFirstDraw = action.payload[0]
            state.kenoListDraw = action.payload
        },
    },
})

export const {
    getPowerDraw, getMegaDraw,
    getMax3dDraw, getMax3dProDraw,
    getKenoDraw
} = drawSlice.actions
export default drawReducer = drawSlice.reducer