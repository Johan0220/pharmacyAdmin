import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/features/product/productSlice";
import authReducer from "@/redux/features/auth/authSlice";
import errorReducer from "@/redux/features/error/errSlice";
import resumeReducer from "@/redux/features/resume/resumeSlice";
import userReducer from "@/redux/features/user/userSlice";
import dashboardReducer from "@/redux/features/dashboard/dashboardSlice";
import {persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist';
import storage from "./storage";
const persistConfig = {
    key: 'reduxStorage',
    version: 1,
    storage,
    whitelist: ['auth']
}
const rootReducer = combineReducers({
    product: productReducer,
    auth: authReducer,
    error: errorReducer,
    resume: resumeReducer,
    user: userReducer,
    dashboard: dashboardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = () => {
    return configureStore({
    reducer: persistedReducer,
            middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    });
} 
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export default store;