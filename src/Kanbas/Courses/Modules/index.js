import ModuleList from "./ModuleList";
import CourseNavigation from "../CourseNavigation";
import PublishBar from "../PublishBar";
import TopBar from "../../TopBar";

function Modules() {
    const topBarBreadcrumbs = ["Modules"];

    return (
        <>
            <TopBar breadcrumbs={topBarBreadcrumbs} studentView={true}/>
            <CourseNavigation/>
            <PublishBar/>
            <ModuleList/>
        </>
    );
}

export default Modules;