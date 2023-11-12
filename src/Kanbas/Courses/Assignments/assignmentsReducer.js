import {createSlice} from "@reduxjs/toolkit";

const initialAssignment = {
    name: "New Assignment",
    description: "New Description",
}

const initialState = {
    assignments: [],
    initialAssignment: initialAssignment,
    assignment: {...initialAssignment,},
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [...state.assignments, action.payload];
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
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
    },
});

export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    setAssignment,
    setAssignments
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;