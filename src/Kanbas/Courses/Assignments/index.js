import db from "../../Database";
import {Link, useParams} from "react-router-dom";
import {FaBars, FaCaretDown, FaGlasses, FaGripVertical, FaPlus} from "react-icons/fa";
import CourseNavigation from "../CourseNavigation";
import './index.css';
import {FaCircleCheck, FaEllipsisVertical, FaPenToSquare} from "react-icons/fa6";

function Assignments() {
    const {courseId} = useParams();
    const course = db.courses.find((course) => course._id === courseId);
    const assignments = db.assignments;
    const courseAssignments = assignments.filter(
        (assignment) => assignment.course === courseId);

    return (
        <>
            <div className="d-none d-md-block">
                <nav className="top-bar divider" aria-label="breadcrumb">
                    <FaBars size="2em" style={{color: '#b52828'}}></FaBars>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ms-5">
                            <Link to={`/Kanbas/Courses/${course._id}/Home`}>{course.name}</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            Assignments
                        </li>
                    </ol>
                    <div className="ms-auto">
                        <button type="button" className="btn grey-button me-1">
                            <FaGlasses className="me-1"></FaGlasses>
                            Student View
                        </button>
                    </div>
                </nav>
                <hr/>
            </div>
            <CourseNavigation/>

            <div className="d-flex flex-nowrap button-layout">
                <input id="searchbar" className="form-control top-button float-start"
                       placeholder="Search for Assignment"/>
                <div className="d-flex flex-nowrap">
                    <button type="button" className="btn grey-button me-1 top-button">
                        <FaPlus className="me-1 mb-1"/>
                        Group
                    </button>
                    <button type="button" className="btn btn-danger me-1 top-button">
                        <FaPlus className="me-1 mb-1"/>
                        Assignment
                    </button>
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
                        <FaGripVertical />
                        <FaPenToSquare className="ms-3 me-3" size="1.5em" style={{color: "#008242"}}/>
                        <Link
                        key={assignment._id}
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                        className="link w-100">
                        {assignment.title}
                    </Link>
                        <FaCircleCheck className="me-4" style={{color: "#008242"}} />
                        <FaEllipsisVertical />
                    </li>
                ))}
            </ul>

        </>
    );
}

export default Assignments;