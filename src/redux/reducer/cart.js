import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

// Create Redux state slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state, action) => {
            return {
                ...state,
                cart: action.payload
            }
        },
        addLottery: (state, action) => {
            state.cart = [...state.cart].concat(action.payload)
        },
        updateLottery: (state, action) => {
            let tmp = [...state.cart]
            const index = tmp.findIndex(item => item.id == action.payload.lotteryId);
            tmp[index].NumberLottery = action.payload.number || tmp[index].NumberLottery
            tmp[index].drawCode = action.payload.drawCode || tmp[index].drawCode
            tmp[index].drawTime = action.payload.drawTime || tmp[index].drawTime
            state.cart = tmp
        },
        removeLottery: (state, action) => {
            state.cart = state.cart.filter((b) => b.id !== action.payload.lotteryId)
        },
        removeCart: (state) => {
            state.cart = []
        },
    },
})

export const { getCart, addLottery, removeLottery, updateLottery, removeCart } = cartSlice.actions
export default cartReducer = cartSlice.reducer