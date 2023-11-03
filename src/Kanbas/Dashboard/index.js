import {Link} from "react-router-dom";
import './index.css';
import {useDispatch, useSelector} from "react-redux";
import {addNewCourse, deleteCourse, setCourse, updateCourse} from "../Courses/coursesReducer";
import {setIsNew} from "../Courses/isNewReducer";
import {useState} from "react";

function Dashboard() {
    const courses = useSelector((state) => state.coursesReducer.courses);
    const course = useSelector((state) => state.coursesReducer.course);
    const initialCourse = useSelector((state) => state.coursesReducer.initialCourse);
    const dispatch = useDispatch();
    const isNew = useSelector((state) => state.isNewReducer.isNew);
    const [numCourses, setNumCourses] = useState(courses.length);

    const handleSave = () => {
        if (isNew) {
            setNumCourses(numCourses + 1);
            dispatch(addNewCourse({...course}));
        } else {
            dispatch(updateCourse(course));
        }
    }

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

            <div className="modal fade" id="courseModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">
                                {isNew ? "Create New Course" : "Edit Course"}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="course-name" className="form-label fw-bold">Course Name</label>
                            <input value={course.name} className="form-control mb-2" id="course-name"
                                   onChange={(e) => dispatch(setCourse({...course, name: e.target.value}))}/>
                            <label htmlFor="course-number" className="form-label fw-bold">Course Number</label>
                            <input value={course.number} className="form-control mb-2" id="course-number"
                                   onChange={(e) => dispatch(setCourse({...course, number: e.target.value}))}/>
                            <label htmlFor="course-startDate" className="form-label fw-bold">Course Start Date</label>
                            <input value={course.startDate} className="form-control mb-2" type="date" id="course-startDate"
                                   onChange={(e) => dispatch(setCourse({...course, startDate: e.target.value}))}/>
                            <label htmlFor="course-endDate" className="form-label fw-bold">Course End Date</label>
                            <input value={course.endDate} className="form-control" type="date" id="course-endDate"
                                   onChange={(e) => dispatch(setCourse({...course, endDate: e.target.value}))}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteCourseModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Delete Course</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this course?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => {
                                        setNumCourses(numCourses - 1);
                                        dispatch(deleteCourse(course._id))
                                    }}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;