import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import authReducer from './auth'
import userReducer from './user'
import cartReducer from './cart'
import drawReducer from './draw';
import systemReducer from './system'

const authSetup = {
    key: "auth",
    storage: AsyncStorage,
}

const userSetup = {
    key: "user",
    storage: AsyncStorage,
}

const cartSetup = {
    key: "cart",
    storage: AsyncStorage,
}

const systemSetup = {
    key: 'system',
    storage: AsyncStorage
}
export const rootReducer = combineReducers({
    authReducer: persistReducer(authSetup, authReducer),
    userReducer: persistReducer(userSetup, userReducer),
    cartReducer: persistReducer(cartSetup, cartReducer),
    drawReducer,
    systemReducer: persistReducer(systemSetup, systemReducer)
})

