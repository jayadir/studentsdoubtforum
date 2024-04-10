import {configureStore} from '@reduxjs/toolkit';
import { userSliceReducer } from './Slices/userSice';

export const store=configureStore({
    reducer:{
        user:userSliceReducer
    }
})