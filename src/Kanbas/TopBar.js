import {FaBars, FaGlasses} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import * as client from "./Courses/client";
import {setCourses} from "./Courses/coursesReducer";
import {useDispatch} from "react-redux";

function TopBar({breadcrumbs, studentView}) {
    const {courseId} = useParams();
    const courses = useSelector((state) => state.coursesReducer.courses);
    const course = courses.find(course => course._id === courseId);
    const dispatch = useDispatch();
    useEffect(() => {
        client.findAllCourses()
            .then((courses) =>
                dispatch(setCourses(courses))
            );
    }, [courses]);

    return (
        <>
            {course && (
                <div className="d-none d-md-block">
                    <nav className="top-bar divider" aria-label="breadcrumb">
                        <FaBars size="2em" style={{color: '#b52828'}}></FaBars>
                        <ol className="breadcrumb">
                            <li key="0" className="breadcrumb-item ms-5">
                                <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                                    {course.name}
                                </Link>
                            </li>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <li className="breadcrumb-item" aria-current="page" key={index + 1}>{breadcrumb}</li>
                            ))}
                        </ol>
                        {studentView && (
                            <div className="ms-auto">
                                <button type="button" className="btn grey-button me-1">
                                    <FaGlasses className="me-1"></FaGlasses>
                                    Student View
                                </button>
                            </div>)}
                    </nav>
                    <hr/>
                </div>
            )}
        </>
    )
}

export default TopBar;