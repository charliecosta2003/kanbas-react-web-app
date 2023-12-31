import KanbasNavigation from "./KanbasNavigation";
import {Navigate, Route, Routes} from "react-router";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import './index.css';
import store from "./store";
import {Provider} from "react-redux";

function Kanbas() {

    return (
        <Provider store={store}>
            <div className="d-flex h-100">
                <KanbasNavigation/>
                <div className="content-wrapper wrapper ms-md-100 ms-sm-15">
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard"/>}/>
                        <Route path="Account" element={<h1>Account</h1>}/>
                        <Route path="Dashboard" element={<Dashboard/>}/>
                        <Route path="Courses/:courseId/*" element={<Courses />}/>
                        <Route path="Courses" element={<h1>Courses</h1>}/>
                        <Route path="Calendar" element={<h1>Calendar</h1>}/>
                        <Route path="Inbox" element={<h1>Inbox</h1>}/>
                        <Route path="History" element={<h1>History</h1>}/>
                        <Route path="Studio" element={<h1>Studio</h1>}/>
                        <Route path="Commons" element={<h1>Commons</h1>}/>
                        <Route path="Help" element={<h1>Help</h1>}/>
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}

export default Kanbas;