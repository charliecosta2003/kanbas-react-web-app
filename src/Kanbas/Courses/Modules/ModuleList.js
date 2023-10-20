import {useParams} from "react-router-dom";
import db from "../../Database";
import {FaCaretDown, FaCaretRight, FaGripVertical, FaPlus} from "react-icons/fa";
import {FaCircleCheck, FaEllipsisVertical} from "react-icons/fa6";

function ModuleList() {
    const {courseId} = useParams();
    const modules = db.modules;

    return (
        <div className="module-wrapper-inner flex-grow-1">
            <ul className="list-group">
                {
                    modules
                        .filter((module) => module.course === courseId)
                        .map((module, index) => (
                            <li key={index} className="list-group-item list-group-item-secondary rounded-0 pt-4 pb-4
                            mt-4 mb-2 d-flex flex-nowrap align-items-center border-1">
                                <FaGripVertical className="me-1 ms-1"/>
                                <FaCaretRight className="me-2" />
                                <div className="w-100">{module.name} - {module.description}</div>
                                <FaCircleCheck style={{color: '#008242'}}/>
                                <FaCaretDown className="me-3" />
                                <FaPlus className="me-1"/>
                                <FaEllipsisVertical className="ms-3" />
                            </li>
                        ))
                }
            </ul>
        </div>
    );
}

export default ModuleList;