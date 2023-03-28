import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import booksReducer from './book'

const bookSetup = {
    key: "root",
    storage: AsyncStorage,
}

export const rootReducer = combineReducers({
    booksReducer: persistReducer(bookSetup, booksReducer)
})

