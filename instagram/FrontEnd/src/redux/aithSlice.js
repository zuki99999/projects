import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {//sabai function reducer ma lekhnee...
        setAuthUser:(state,action)=>{
                state.user = action.payload;
        }
  },
});

export const {setAuthUser} = authSlice.actions;
export default authSlice.reducer;
