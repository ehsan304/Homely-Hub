import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/useSlice.js'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'


const rootReducer = combineReducers({user: userReducer})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddlware)=> getDefaultMiddlware({serializableCheck: true})
});


export const persistor = persistStore(store)