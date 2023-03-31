import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: "",
    phoneNumber: "",
    fullName: "",
    email: "",
    address: "",
    identify: "",
    role: "",
    avatar: "",
    personNumber: "",
    MoneyAccount: 0,
    RewardWallet: 0
}

// Create Redux state slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            console.log(action)
            let newState = { ...state }
            state.id = action.payload.id || newState.id
            state.phoneNumber = action.payload.phoneNumber || newState.phoneNumber
            state.fullName = action.payload.fullName || newState.fullName
            state.email = action.payload.email || newState.email
            state.address = action.payload.address || newState.address
            state.identify = action.payload.identify || newState.identify
            state.role = action.payload.role || newState.role
            state.avatar = action.payload.avatar || newState.avatar
            state.personNumber = action.payload.personNumber || newState.personNumber
            state.MoneyAccount = action.payload.luckykingBalance || newState.MoneyAccount
            state.RewardWallet = action.payload.rewardWalletBalance || newState.RewardWallet
        },
        removeUser: (state) => {
            state = initialState
        },
    },
})

export const { updateUser, removeUser } = userSlice.actions
export default userReducer = userSlice.reducer