import {Link, useParams} from "react-router-dom";
import {FaCaretDown, FaGripVertical, FaPlus} from "react-icons/fa";
import CourseNavigation from "../CourseNavigation";
import './index.css';
import {FaCircleCheck, FaEllipsisVertical, FaPenToSquare} from "react-icons/fa6";
import TopBar from "../../TopBar";
import {setAssignment, setAssignments} from "./assignmentsReducer";
import {useDispatch, useSelector} from "react-redux";
import DeleteAssignmentModal from "./DeleteAssignmentModal";
import * as client from "./client";
import {useEffect} from "react";

function Assignments() {
    const {courseId} = useParams();
    const assignments = useSelector((state) => state.assignmentsReducer.assignments);
    const initialAssignment = useSelector((state) => state.assignmentsReducer.initialAssignment);
    const topBarBreadcrumbs = ["Assignments"];
    const dispatch = useDispatch();
    useEffect(() => {
        client.findAssignmentsForCourse(courseId)
            .then((assignments) => {
                    dispatch(setAssignments(assignments));
                }
            );
    }, [courseId]);

    return (
        <>
            <TopBar breadcrumbs={topBarBreadcrumbs} studentView={true}/>
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
                          to={`/Kanbas/Courses/${courseId}/Assignments/newAssignment`}
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
                {assignments.map((assignment) => {
                        return (
                            <li className="list-group-item green-left-border ps-2">
                                <FaGripVertical/>
                                <FaPenToSquare className="ms-3 me-3" size="1.5em" style={{color: "#008242"}}/>
                                <Link
                                    key={assignment._id}
                                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                                    className="link w-100"
                                    onClick={() => dispatch(setAssignment(assignment))}
                                >
                                    {assignment.name}
                                </Link>
                                <button type="button" className="btn btn-danger me-4" data-bs-toggle="modal"
                                        data-bs-target="#deleteAssignmentModal"
                                        onClick={() => dispatch(setAssignment(assignment))}>
                                    Delete
                                </button>
                                <FaCircleCheck className="me-4" style={{color: "#008242"}}/>
                                <FaEllipsisVertical/>
                            </li>
                        )
                    }
                )}
            </ul>

            <DeleteAssignmentModal/>

        </>
    );
}

export default Assignments;