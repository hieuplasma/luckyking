import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import authReducer from './auth'
import userReducer from './user'

// const bookSetup = {
//     key: "book",
//     storage: AsyncStorage,
// }

const authSetup = {
    key: "auth",
    storage: AsyncStorage,
}

const userSetup = {
    key: "user",
    storage: AsyncStorage,
}
export const rootReducer = combineReducers({
    authReducer: persistReducer(authSetup, authReducer),
    userReducer: persistReducer(userSetup, userReducer)
})

