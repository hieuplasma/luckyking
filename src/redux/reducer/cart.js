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
            state.cart = [...state.cart, action.payload]
        },
        removeLottery: (state, action) => {
            state.cart = state.cart.filter((b) => b.id !== action.payload.id)
        },
        removeCart: (state) => {
            state = initialState
        },
    },
})

export const { getCart, addLottery, removeLottery, removeCart } = cartSlice.actions
export default cartReducer = cartSlice.reducer