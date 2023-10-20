import db from "../../Database";
import {Link, useParams} from "react-router-dom";
import {FaBars, FaFileExport, FaFileImport, FaFilter, FaGlasses, FaSearch} from "react-icons/fa";
import CourseNavigation from "../CourseNavigation";
import {FaGear} from "react-icons/fa6";
import "./index.css";
import TopBar from "../../TopBar";

function Grades() {
    const {courseId} = useParams();
    const course = db.courses.find((course) => course._id === courseId);
    const assignments = db.assignments.filter((assignment) => assignment.course === courseId);
    const enrollments = db.enrollments.filter((enrollment) => enrollment.course === courseId);
    const topBarBreadcrumbs = ["Grades"];

    return (
        <>
            <TopBar breadcrumbs={topBarBreadcrumbs} studentView={false}/>
            <CourseNavigation/>

            <div className="d-flex flex-nowrap justify-content-end mb-2">
                <button type="button" className="btn grey-button me-1 top-button">
                    <FaFileImport className="mb-1 me-1"/>
                    Import
                </button>
                <div className="d-flex d-nowrap">
                    <FaFileExport className="position-absolute" id="export-icon"/>
                    <select id="export" className="form-select grey-button me-1 top-button">
                        <option selected>Export</option>
                    </select>
                </div>
                <button type="button" className="btn grey-button top-button">
                    <FaGear className="mb-1"/>
                </button>
            </div>
            <div className="row mb-3">
                <div className="col ps-0">
                    <label className="form-label fw-bold"
                           htmlFor="text-fields-student-names">
                        Student Names
                    </label>
                    <div>
                        <FaSearch className="position-absolute search-icon ms-2"/>
                        <input className="form-control ps-5" id="text-fields-student-names"
                               placeholder="Search Students"/>
                    </div>
                </div>
                <div className="col pe-0">
                    <label className="form-label fw-bold"
                           htmlFor="text-fields-assignment-names">
                        Assignment Names
                    </label>
                    <div>
                        <FaSearch className="position-absolute search-icon ms-2"/>
                        <input className="form-control ps-5" id="text-fields-assignment-names"
                               placeholder="Search Assignments"/>
                    </div>
                </div>
            </div>
            <button className="btn grey-button mb-3">
                <FaFilter/>
                Apply Filters
            </button>


            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-secondary">
                    <tr>
                        <th className="first-col">Student Name</th>
                        {assignments.map((assignment) => (<th>{assignment.title}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {enrollments.map((enrollment) => {
                        const user = db.users.find((user) => user._id === enrollment.user);
                        return (
                            <tr>
                                <td className="first-col"><span>{user.firstName} {user.lastName}</span></td>
                                {assignments.map((assignment) => {
                                    const grade = db.grades.find(
                                        (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                    return (<td>{grade?.grade || ""}</td>);
                                })}
                            </tr>);
                    })}
                    </tbody>
                </table>
            </div>
        </>);
}

export default Grades;