import {Link, useLocation, useParams} from "react-router-dom";
import './index.css';
import {FaEyeSlash} from "react-icons/fa";

function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", "Quizzes", "Grades", "People", "Panopto Video", "Discussions",
        "Announcements", "Pages", "Files", "Rubrics", "Outcomes", "Collaborations", "Syllabus", "Settings"];
    const {courseId} = useParams();
    const {pathname} = useLocation();

    return (
        <div className="list-group nav-outer d-none d-md-block" style={{width: 150}}>
            {links.map((link, index) => (
                <div className={`list-group-item nav-item ${pathname.includes(link) && "selected"}`}>
                    <Link
                        key={index}
                        to={`/Kanbas/Courses/${courseId}/${link}`}
                        className="link">
                        {link}
                    </Link>
                    {index >= 9 && index <= 16 && <FaEyeSlash className="ms-3 me-3 float-end flip-horizontal" />}
                </div>
            ))}
        </div>
    )
}

export default CourseNavigation;