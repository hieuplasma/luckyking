
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducer';
import { configureStore } from '@reduxjs/toolkit';

export default function reduxConfig(onCompletion = () => { }) {
    // Disable all action saga log when return false, true otherwise
    const logger = createLogger({
        predicate: (getState, action) => true
    });
    // Create Redux store:
    const store = configureStore({
        reducer: rootReducer
        // middleware: [logger],
    })
    const persistor = persistStore(store, null, onCompletion);
    return { store, persistor };
}
