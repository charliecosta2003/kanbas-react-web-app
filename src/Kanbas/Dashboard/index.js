import {Link} from "react-router-dom";
import db from "../Database";
import './index.css';

function Dashboard() {
    const courses = db.courses;

    return (
        <>
            <div className="d-none d-md-block">
                <div className="top-bar">
                    <h1>Dashboard</h1>
                </div>
            </div>
            <hr/>
            <div className="outer-card-wrapper">
                <h3>Published Courses (3)</h3>
                <hr className="mt-2"/>
                <div className="inner-card-wrapper d-flex flex-row flex-wrap">
                    {courses.map((course, index) => (
                        <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="link">
                            <div className="card" id={`card-${index}`}>
                                <div className="card-header"></div>
                                <div className="card-body">
                                    <h6 className="title">{course.name}</h6>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Dashboard;