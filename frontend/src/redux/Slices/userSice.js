import {createSlice} from '@reduxjs/toolkit';
const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        removeUser:(state)=>{
            state.user=null;
        }
    }
})
export const {setUser,removeUser} =userSlice.actions;
export const userSliceReducer=userSlice.reducer;
export const userSelector=(state)=>state.user.user;