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
    kenoListDraw: [],

    jackpots: {
        JackPot1Power: 0,
        JackPot2Power: 0,
        JackPotMega: 0
    }
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
        loadMoreKenoDraw: (state, action) => {
            state.kenoListDraw = [...state.kenoListDraw.concat(action.payload)]
        },
        deleteFirstDrawKeno: (state) => {
            state.kenoFirstDraw = [...state.kenoListDraw][1]
            state.kenoListDraw = [...state.kenoListDraw.slice(1)]
        },

        getJackpot: (state, action) => {
            state.jackpots = action.payload
        },
    },
})

export const {
    getPowerDraw, getMegaDraw,
    getMax3dDraw, getMax3dProDraw,
    getKenoDraw,
    loadMoreKenoDraw, deleteFirstDrawKeno,
    getJackpot
} = drawSlice.actions
export default drawReducer = drawSlice.reducer