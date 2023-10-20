import {Link, useLocation} from 'react-router-dom';
import './index.css';
import {FaBook, FaClock, FaInbox, FaTv, FaUserCircle} from "react-icons/fa";
import {FaCalendarDays, FaCircleQuestion, FaGauge, FaRightFromBracket} from "react-icons/fa6";

function KanbasNavigation() {
    const links = ["Account", "Dashboard", "Courses", "Calendar", "Inbox", "History", "Studio", "Commons", "Help"];
    const icons = [<FaUserCircle size="3em"/>, <FaGauge size="2em"/>, <FaBook size="2em"/>,
        <FaCalendarDays size="2em"/>, <FaInbox size="2em"/>, <FaClock size="2em"/>, <FaTv size="2em"/>,
        <FaRightFromBracket size="2em"/>, <FaCircleQuestion size="2em"/>];
    const {pathname} = useLocation();

    return (
        <div className="list-group kanbas-nav-outer top-z-index d-none d-md-block" style={{width: 150}}>
            <li className="list-group-item kanbas-nav-item">
                <img width='80px' src="https://instructure-uploads.s3.amazonaws.com/account_145230000000000001/attachments/949/NU_MonoLVX_RGB_RW.png"/>
            </li>
            {links.map((link, index) => (
                <li className={`list-group-item kanbas-nav-item ${pathname.includes(link) && "selected"}`}
                    id={link}>
                    <Link
                        key={index}
                        to={`/Kanbas/${link}`}
                        className={"link"}>
                        <div className="icon">{icons[index]}</div>
                        <span>{link}</span>
                    </Link>
                </li>
            ))}
        </div>
    );
}

export default KanbasNavigation;