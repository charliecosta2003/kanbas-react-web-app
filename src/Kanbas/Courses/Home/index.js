import ModuleList from "../Modules/ModuleList";
import CourseNavigation from "../CourseNavigation";
import {FaBan, FaBell, FaBullhorn, FaFileImport} from "react-icons/fa";
import PublishBar from "../PublishBar";
import {FaChartSimple, FaCircleCheck, FaLocationCrosshairs, FaRightFromBracket} from "react-icons/fa6";
import TopBar from "../../TopBar";

function Home() {
    const options = ["Import Existing Content", "Import From Commons", "Choose Home Page",
        "View Course Stream", "New Announcement", "New Analytics", "View Course Notifications"];
    const optionIcons = [<FaFileImport className="me-1"/>, <FaRightFromBracket className="me-1"/>,
        <FaLocationCrosshairs className="me-1"/>, <FaChartSimple className="me-1"/>, <FaBullhorn className="me-1"/>,
        <FaChartSimple className="me-1"/>, <FaBell className="me-1"/>];

    const topBarBreadcrumbs = ["Home"];

    return (
        <>
            <TopBar breadcrumbs={topBarBreadcrumbs} studentView={true}/>
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