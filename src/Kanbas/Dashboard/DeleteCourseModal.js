import {deleteCourse} from "../Courses/coursesReducer";
import {useDispatch, useSelector} from "react-redux";

function DeleteCourseModal({numCourses, setNumCourses}) {
    const course = useSelector((state) => state.coursesReducer.course);
    const dispatch = useDispatch();

    return (
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
    );
}

export default DeleteCourseModal;