import {FaBars, FaGlasses} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import db from "./Database";

function TopBar({breadcrumbs, studentView}) {
    const {courseId} = useParams();
    const course = db.courses.find((course) => course._id === courseId);

    return (
            <>
                <div className="d-none d-md-block">
                    <nav className="top-bar divider" aria-label="breadcrumb">
                        <FaBars size="2em" style={{color: '#b52828'}}></FaBars>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item ms-5">
                                <Link to={`/Kanbas/Courses/${course._id}/Home`}>{course.name}</Link>
                            </li>
                            {breadcrumbs.map(breadcrumb => (
                                <li className="breadcrumb-item" aria-current="page">{breadcrumb}</li>
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
            </>
        )
}

export default TopBar;