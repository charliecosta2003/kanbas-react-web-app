import {Navigate, Route, Routes} from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import './index.css';
import Grades from "./Grades";

function Courses() {


    return (
        <Routes>
            <Route path="/" element={<Navigate to="Home"/>}/>
            <Route path="Home" element={<Home/>}/>
            <Route path="Modules" element={<Modules/>}/>
            <Route path="Assignments" element={<Assignments/>}/>
            <Route
                path="Assignments/:assignmentId"
                element={<AssignmentEditor/>}
            />
            <Route path="Grades" element={<Grades />}/>
        </Routes>
    );
}

export default Courses;