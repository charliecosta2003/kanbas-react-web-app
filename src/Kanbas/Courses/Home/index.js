import ModuleList from "../Modules/ModuleList";
import CourseNavigation from "../CourseNavigation";
import db from '../../Database';
import {Link, useParams} from "react-router-dom";
import {FaBan, FaBars, FaBell, FaBullhorn, FaFileImport, FaGlasses} from "react-icons/fa";
import PublishBar from "../PublishBar";
import {FaChartSimple, FaCircleCheck, FaLocationCrosshairs, FaRightFromBracket} from "react-icons/fa6";


function Home() {
    const {courseId} = useParams();
    const course = db.courses.find((course) => course._id === courseId);

    const options = ["Import Existing Content", "Import From Commons", "Choose Home Page",
        "View Course Stream", "New Announcement", "New Analytics", "View Course Notifications"];
    const optionIcons = [<FaFileImport className="me-1"/>, <FaRightFromBracket className="me-1"/>,
        <FaLocationCrosshairs className="me-1"/>, <FaChartSimple className="me-1"/>, <FaBullhorn className="me-1"/>,
        <FaChartSimple className="me-1"/>, <FaBell className="me-1"/>];

    return (
        <>
            <div className="d-none d-md-block">
                <nav className="top-bar divider" aria-label="breadcrumb">
                    <FaBars size="2em" style={{color: '#b52828'}}></FaBars>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ms-5">
                            <Link to={`/Kanbas/Courses/${course._id}/Home`}>{course.name}</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">Home</li>
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
            <PublishBar/>
            <div className="d-flex">
                <ModuleList/>
                <div className="status-wrapper ms-5 me-2 d-none d-xl-block">
                    <h6>Course Status</h6>
                    <div className="d-flex flex-nowrap mb-3">
                        <button className="publish btn grey-button rounded-0">
                            <FaBan className="mb-1 me-1"/>
                            Unpublish
                        </button>
                        <button className="publish btn btn-success disabled rounded-0">
                            <FaCircleCheck className="mb-1 me-1"/>
                            Published
                        </button>
                    </div>
                    <div className="option-list">
                        <ul className="list-group">
                            {options.map((option, index) => (
                            <button className="list-group-item btn grey-button mb-1 w-100 text-start border-1">
                                {optionIcons[index]}
                                {option}
                            </button>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;