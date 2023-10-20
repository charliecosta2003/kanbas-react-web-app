import {Link, useNavigate, useParams} from "react-router-dom";
import db from "../../../Database";
import CourseNavigation from "../../CourseNavigation";
import {FaCircleCheck, FaEllipsisVertical} from "react-icons/fa6";
import TopBar from "../../../TopBar";

function AssignmentEditor() {
    const {assignmentId, courseId} = useParams();
    const course = db.courses.find((course) => course._id === courseId);
    const assignment = db.assignments.find(
        (assignment) => assignment._id === assignmentId);
    const navigate = useNavigate();
    const handleSave = () => {
        console.log("Actulally saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    const topBarBreadcrumbs = [<Link to={`/Kanbas/Courses/${course._id}/Assignments`}>Assignments</Link>,
        assignment.title
    ];

    return (
        <>
            <TopBar breadcrumbs={topBarBreadcrumbs} studentView={false}/>
            <div className="d-flex flex-nowrap">
                <CourseNavigation/>

                <div className="w-100">
                    <div className="d-flex flex-nowrap justify-content-end align-items-center">
                        <div className="d-flex flex-nowrap">
                            <div
                                className="me-2 top-button d-flex flex-nowrap align-items-center text-success fw-bold">
                                <FaCircleCheck className="me-1"/>
                                Published
                            </div>
                            <button type="button" className="btn grey-button top-button">
                                <FaEllipsisVertical/>
                            </button>
                        </div>
                    </div>
                    <hr/>

                    <label className="form-label" htmlFor="assignment-name">Assignment Name</label>
                    <input value={assignment.title}
                           className="form-control mb-4"
                           id="assignment-name"/>

                    <hr/>
                    <div className="d-flex flex-nowrap justify-content-between align-items-center">
                        <div className="d-flex flex-nowrap align-items-center">
                            <input className="form-check-inline float-start ms-2" type="checkbox" value="NOTIFY"
                                   name="check-notify"
                                   id="checkbox-notify"/>
                            <label className="form-check-label float-start" htmlFor="checkbox-notify">Notify users
                                that
                                this
                                content has changed</label>
                        </div>

                        <div className="d-flex flex-nowrap">
                            <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                                  className="btn grey-button me-1">
                                Cancel
                            </Link>
                            <button onClick={handleSave} className="btn btn-danger me-2">
                                Save
                            </button>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
        </>
    );
}

export default AssignmentEditor;