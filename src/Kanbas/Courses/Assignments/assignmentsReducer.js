import db from "../../Database";
import {createSlice} from "@reduxjs/toolkit";

const initialAssignment = {
    title: "New Assignment",
    description: "New Description",
}

const initialState = {
    assignments: db.assignments,
    initialAssignment: initialAssignment,
    assignment: {
        ...initialAssignment,
    },
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                {...action.payload, _id: new Date().getTime().toString()},
                ...state.assignments,
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        },
    },
});

export const {addAssignment, deleteAssignment, updateAssignment, setAssignment} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;