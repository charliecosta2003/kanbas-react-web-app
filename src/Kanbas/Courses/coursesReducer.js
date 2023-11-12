import {createSlice} from "@reduxjs/toolkit";

const initialCourse = {
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
}

const initialState = {
    courses: [],
    initialCourse: initialCourse,
    course: {...initialCourse},
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addNewCourse: (state, action) => {
            state.courses = [
                ...state.courses,
                {
                    ...action.payload, _id: new Date().getTime().toString(),
                },
            ];
        },
        deleteCourse: (state, action) => {
            state.courses = state.courses.filter(
                (course) => course._id !== action.payload
            );
        },
        updateCourse: (state, action) => {
            state.courses = state.courses.map((course) => {
                if (course._id === action.payload._id) {
                    return action.payload;
                } else {
                    return course;
                }
            });
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
    },
});

export const {addNewCourse, deleteCourse, updateCourse, setCourse, setCourses} = coursesSlice.actions;
export default coursesSlice.reducer;