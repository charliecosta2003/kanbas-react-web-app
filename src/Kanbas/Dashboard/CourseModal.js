import {addNewCourse, setCourse, updateCourse} from "../Courses/coursesReducer";
import {useDispatch, useSelector} from "react-redux";

function CourseModal({numCourses, setNumCourses}) {
    const course = useSelector((state) => state.coursesReducer.course);
    const isNew = useSelector((state) => state.isNewReducer.isNew);
    const dispatch = useDispatch();

    const handleSave = () => {
        if (isNew) {
            setNumCourses(numCourses + 1);
            dispatch(addNewCourse({...course}));
        } else {
            dispatch(updateCourse(course));
        }
    }

    return (
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
                        <input value={course.startDate} className="form-control mb-2" type="date"
                               id="course-startDate"
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
    );
}

export default CourseModal;