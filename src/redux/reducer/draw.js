import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    powerFirstDraw: "",
    listPowerDraw: [],
    megaFirstDraw: "",
    listMegaDraw:[]
}

// Create Redux state slice
const drawSlice = createSlice({
    name: 'draw',
    initialState,
    reducers: {
        getPowerDraw: (state, action) => {
            state.powerFirstDraw = action.payload[0]
            state.listPowerDraw = action.payload
        },
        getMegaDraw: (state, action) => {
            state.megaFirstDraw = action.payload[0]
            state.listMegaDraw = action.payload
        },
    },
})

export const { getPowerDraw, getMegaDraw } = drawSlice.actions
export default drawReducer = drawSlice.reducer