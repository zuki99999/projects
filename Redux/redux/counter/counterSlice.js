import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    multiply:(state)=>{
        state.value *=10
    },
    divide:(state)=>{
        state.value /=10
    },
    setZero:(state)=>{
        state.value = 0;
    }

  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement,multiply ,divide ,setZero } = counterSlice.actions

export default counterSlice.reducer