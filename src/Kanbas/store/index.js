import {configureStore} from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import isNewReducer from "../Courses/isNewReducer";
import coursesReducer from "../Courses/coursesReducer";

const store = configureStore({
    reducer: {
        coursesReducer,
        modulesReducer,
        assignmentsReducer,
        isNewReducer,
    }
});

export default store;