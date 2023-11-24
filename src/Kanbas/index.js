import KanbasNavigation from "./KanbasNavigation";
import {Navigate, Route, Routes} from "react-router";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import './index.css';
import store from "./store";
import {Provider} from "react-redux";
import SignIn from "./Users/SignIn";
import Account from "./Users/Account";
import UserTable from "./Users/UserTable";
import React, {useEffect, useState} from "react";
import SignUp from "./Users/SignUp";
import * as client from "./Users/client.js";

function Kanbas() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkIfSignedIn = async () => {
        const user = await client.account();
        if (user)
            setIsSignedIn(true);
        setLoading(false);
    }

    useEffect(() => {
        checkIfSignedIn();
    }, []);

    if (loading)
        return null;

    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Navigate to="signin"/>}/>
                <Route path="signin"
                       element={!isSignedIn ? <SignIn setIsSignedIn={setIsSignedIn}/> : <Navigate to="Account"/>}/>
                <Route path="signup"
                       element={!isSignedIn ? <SignUp setIsSignedIn={setIsSignedIn}/> : <Navigate to="Account"/>}/>
            </Routes>
            <div className="d-flex h-100">
                {isSignedIn && <KanbasNavigation/>}
                <div className="content-wrapper wrapper ms-md-100 ms-sm-15">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account"/>}/>
                        <Route path="Account" element={isSignedIn ? <Account setIsSignedIn={setIsSignedIn}/> :
                            <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="Dashboard" element={isSignedIn ? <Dashboard/> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="Courses/:courseId/*"
                               element={isSignedIn ? <Courses/> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="Courses"
                               element={isSignedIn ? <h1>Courses</h1> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="Calendar"
                               element={isSignedIn ? <h1>Calendar</h1> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="Inbox" element={isSignedIn ? <h1>Inbox</h1> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="History"
                               element={isSignedIn ? <h1>History</h1> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="Studio" element={isSignedIn ? <h1>Studio</h1> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="Commons"
                               element={isSignedIn ? <h1>Commons</h1> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="Help" element={isSignedIn ? <h1>Help</h1> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="/admin/users"
                               element={isSignedIn ? <UserTable/> : <Navigate to="/Kanbas/signin"/>}/>
                        <Route path="/Account/:id" element={isSignedIn ? <Account/> : <Navigate to="/Kanbas/signin"/>}/>
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}

export default Kanbas;