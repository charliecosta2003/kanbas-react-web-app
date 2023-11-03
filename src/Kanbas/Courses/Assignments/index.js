import {Link, useParams} from "react-router-dom";
import {FaCaretDown, FaGripVertical, FaPlus} from "react-icons/fa";
import CourseNavigation from "../CourseNavigation";
import './index.css';
import {FaCircleCheck, FaEllipsisVertical, FaPenToSquare} from "react-icons/fa6";
import TopBar from "../../TopBar";
import {deleteAssignment, setAssignment} from "./assignmentsReducer";
import {useDispatch, useSelector} from "react-redux";

function Assignments() {
    const {courseId} = useParams();
    const courses = useSelector((state) => state.coursesReducer.courses);
    const course = courses.find(course => course._id === courseId);
    const assignments = useSelector((state) => state.assignmentsReducer.assignments);
    const assignment = useSelector((state) => state.assignmentsReducer.assignment);
    const initialAssignment = useSelector((state) => state.assignmentsReducer.initialAssignment);
    const courseAssignments = assignments.filter(
        (assignment) => assignment.course === course._id);
    const topBarBreadcrumbs = ["Assignments"];
    const dispatch = useDispatch();

    return (
        <>
            <TopBar breadcrumbs={topBarBreadcrumbs} studentView={true} course={course}/>
            <CourseNavigation/>

            <div className="d-flex flex-nowrap button-layout">
                <input id="searchbar" className="form-control top-button float-start"
                       placeholder="Search for Assignment"/>
                <div className="d-flex flex-nowrap">
                    <button type="button" className="btn grey-button me-1 top-button">
                        <FaPlus className="me-1 mb-1"/>
                        Group
                    </button>
                    <Link className="btn btn-danger me-1 top-button"
                          to={`/Kanbas/Courses/${course._id}/Assignments/newAssignment`}
                          onClick={() => dispatch(setAssignment({...initialAssignment}))}>
                        <FaPlus className="me-1 mb-1"/>
                        Assignment
                    </Link>
                    <button type="button" className="btn grey-button top-button">
                        <FaEllipsisVertical className="mb-1"/>
                    </button>
                </div>
            </div>
            <hr/>

            <ul className="list-group assignment-list mb-5">
                <li className="list-group-item list-group-item-secondary ps-2 rounded-0">
                    <FaGripVertical className="ms-1 me-3"/>
                    <FaCaretDown className="me-2"/>
                    <div className="w-100 fw-bold text-black">
                        Assignments
                    </div>
                    <div className="pt-1 pb-1 ps-2 pe-2 me-1 border border-secondary rounded-pill text-nowrap">
                        40% of Total
                    </div>
                    <FaPlus className="me-1"/>
                    <FaEllipsisVertical className="ms-3"/>
                </li>
                {courseAssignments.map((assignment) => (
                    <li className="list-group-item green-left-border ps-2">
                        <FaGripVertical/>
                        <FaPenToSquare className="ms-3 me-3" size="1.5em" style={{color: "#008242"}}/>
                        <Link
                            key={assignment._id}
                            to={`/Kanbas/Courses/${course._id}/Assignments/${assignment._id}`}
                            className="link w-100"
                            onClick={() => dispatch(setAssignment(assignment))}
                        >
                            {assignment.title}
                        </Link>
                        <button type="button" className="btn btn-danger me-4" data-bs-toggle="modal"
                                data-bs-target="#deleteAssignmentModal"
                                onClick={() => dispatch(setAssignment(assignment))}>
                            Delete
                        </button>
                        <FaCircleCheck className="me-4" style={{color: "#008242"}}/>
                        <FaEllipsisVertical/>
                    </li>
                ))}
            </ul>

            <div className="modal fade" id="deleteAssignmentModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Delete Assignment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this assignment?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => dispatch(deleteAssignment(assignment._id))}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Assignments;