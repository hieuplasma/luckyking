import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import booksReducer from './book'
import authReducer from './auth'

// const bookSetup = {
//     key: "book",
//     storage: AsyncStorage,
// }

const authSetup = {
    key: "book",
    storage: AsyncStorage,
}
export const rootReducer = combineReducers({
    // booksReducer: persistReducer(bookSetup, booksReducer)
    authReducer: persistReducer(authSetup, authReducer)
})

