import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isNew: false,
};

const isNewSlice = createSlice({
    name: "isNew",
    initialState,
    reducers: {
        setIsNew: (state, action) => {
            state.isNew = action.payload;
        },
    },
});

export const {setIsNew} = isNewSlice.actions;
export default isNewSlice.reducer;