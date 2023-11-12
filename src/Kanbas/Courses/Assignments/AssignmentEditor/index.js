import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import CourseNavigation from "../../CourseNavigation";
import {FaCircleCheck, FaEllipsisVertical} from "react-icons/fa6";
import TopBar from "../../../TopBar";
import {useDispatch, useSelector} from "react-redux";
import {addAssignment, setAssignment, updateAssignment} from "../assignmentsReducer";
import * as client from "../client";

function AssignmentEditor() {
    const {courseId, assignmentId} = useParams();
    const assignments = useSelector((state) => state.assignmentsReducer.assignments);
    const initialAssignment = useSelector((state) => state.assignmentsReducer.initialAssignment);
    const getAssignmentHeader = () => {
        if (assignments.find(assignment => assignment._id === assignmentId) !== undefined) {
            return assignments.find(assignment => assignment._id === assignmentId);
        } else return initialAssignment;
    }
    const assignmentHeader = getAssignmentHeader();
    const assignment = useSelector((state) => state.assignmentsReducer.assignment);
    const navigate = useNavigate();
    const topBarBreadcrumbs = [<Link to={`/Kanbas/Courses/${courseId}/Assignments`}>Assignments</Link>,
        assignmentHeader.name
    ];
    const dispatch = useDispatch();
    const {pathname} = useLocation();

    const handleSave = async () => {
        if (pathname.includes("newAssignment")) {
            const newAssignment = await client.createAssignment(courseId, assignment);
            dispatch(addAssignment(newAssignment));
        } else {
            const status = await client.updateAssignment(assignment);
            dispatch(updateAssignment(assignment));
        }
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    return (
        <>
            {assignment &&
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
                            <input value={assignment.name}
                                   className="form-control mb-4"
                                   id="assignment-name"
                                   onChange={(e) =>
                                       dispatch(setAssignment({...assignment, name: e.target.value}))}
                            />
                            <textarea style={{"height": "100px"}} className="form-control pt-3 pb-3 mb-4"
                                      onChange={(e) => {
                                          dispatch(setAssignment({...assignment, description: e.target.value}))
                                      }}>
                        {assignment.description}
                    </textarea>
                            <div className="row mb-4">
                                <div className="col-4 text-end mt-1">
                                    <label className="form-label">Assign</label>
                                </div>
                                <div className="col-4">
                                    <div className="border rounded-top border-1 p-3">
                                        <label className="form-label fw-bold" htmlFor="text-fields-due">Due</label>
                                        <input className="form-control mb-3" type="date" id="text-fields-due"
                                               value={assignment.dueDate}
                                               onChange={(e) => dispatch(setAssignment({
                                                   ...assignment,
                                                   dueDate: e.target.value
                                               }))}/>
                                        <div className="row">
                                            <div className="col">
                                                <label className="form-label fw-bold"
                                                       htmlFor="text-fields-available-from">Available
                                                    from</label>
                                                <input className="form-control" type="date"
                                                       id="text-fields-available-from"
                                                       value={assignment.availableFromDate}
                                                       onChange={(e) => dispatch(setAssignment({
                                                           ...assignment,
                                                           availableFromDate: e.target.value
                                                       }))}/>
                                            </div>
                                            <div className="col">
                                                <label className="form-label fw-bold"
                                                       htmlFor="text-fields-available-until">Until</label>
                                                <input className="form-control" type="date"
                                                       id="text-fields-available-until"
                                                       value={assignment.availableToDate}
                                                       onChange={(e) => dispatch(setAssignment({
                                                           ...assignment,
                                                           availableToDate: e.target.value
                                                       }))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr/>
                            <div className="d-flex flex-nowrap justify-content-between align-items-center">
                                <div className="d-flex flex-nowrap align-items-center">
                                    <input className="form-check-inline float-start ms-2" type="checkbox" value="NOTIFY"
                                           name="check-notify"
                                           id="checkbox-notify"/>
                                    <label className="form-check-label float-start" htmlFor="checkbox-notify">
                                        Notify users that this content has changed</label>
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
            }
        </>
    );
}

export default AssignmentEditor;