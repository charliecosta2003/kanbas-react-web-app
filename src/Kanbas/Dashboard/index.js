import {Link} from "react-router-dom";
import './index.css';
import {useDispatch, useSelector} from "react-redux";
import {setCourse, setCourses} from "../Courses/coursesReducer";
import {setIsNew} from "../Courses/isNewReducer";
import {useEffect, useState} from "react";
import DeleteCourseModal from "./DeleteCourseModal";
import CourseModal from "./CourseModal";
import * as client from "../Courses/client.js";

function Dashboard() {
    const courses = useSelector((state) => state.coursesReducer.courses);
    const initialCourse = useSelector((state) => state.coursesReducer.initialCourse);
    const dispatch = useDispatch();
    const isNew = useSelector((state) => state.isNewReducer.isNew);
    const [numCourses, setNumCourses] = useState(courses.length);
    useEffect(() => {
        client.findAllCourses()
            .then((courses) =>
                dispatch(setCourses(courses))
            );
    }, [courses]);

    return (
        <>
            <div className="d-none d-md-block">
                <div className="top-bar">
                    <h1>Dashboard</h1>
                </div>
            </div>
            <hr/>
            <div className="outer-card-wrapper">
                <div className="d-flex flex-nowrap">
                    <h3 className="me-3">Published Courses ({numCourses})</h3>
                    <button type="button" className="btn btn-primary"
                            onClick={() => {
                                dispatch(setIsNew(true));
                                console.log(isNew + "");
                                dispatch(setCourse({...initialCourse}));
                            }}
                            data-bs-toggle="modal" data-bs-target="#courseModal">
                        Add Course
                    </button>
                </div>
                <hr className="mt-2"/>
                <div className="inner-card-wrapper d-flex flex-row flex-wrap">
                    {courses.map((course, index) => (
                        <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="link"
                              onClick={() => dispatch(setCourse(course))}>
                            <div className="card" id={`card-${index}`}>
                                <div className="card-header"></div>
                                <div className="card-body">
                                    <h6 className="title">{course.name}</h6>
                                    <button type="button" className="btn btn-success me-2"
                                            data-bs-toggle="modal" data-bs-target="#courseModal"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                dispatch(setIsNew(false));
                                                dispatch(setCourse(course));
                                            }}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn btn-danger"
                                            data-bs-toggle="modal" data-bs-target="#deleteCourseModal"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                dispatch(setCourse(course));
                                            }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <CourseModal numCourses={numCourses} setNumCourses={setNumCourses}/>

            <DeleteCourseModal numCourses={numCourses} setNumCourses={setNumCourses}/>
        </>
    );
}

export default Dashboard;