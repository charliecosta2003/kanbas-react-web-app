import ModuleList from "../Modules/ModuleList";
import CourseNavigation from "../CourseNavigation";
import PublishBar from "../PublishBar";
import TopBar from "../../TopBar";
import CourseStatus from "./CourseStatus";

function Home() {
    const topBarBreadcrumbs = ["Home"];

    return (
        <>
            <TopBar breadcrumbs={topBarBreadcrumbs} studentView={true}/>
            <CourseNavigation/>
            <PublishBar/>
            <div className="d-flex">
                <ModuleList/>
                <CourseStatus/>
            </div>
        </>
    );
}

export default Home;