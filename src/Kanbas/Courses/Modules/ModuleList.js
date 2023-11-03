import {useParams} from "react-router-dom";
import {FaCaretDown, FaCaretRight, FaGripVertical, FaPlus} from "react-icons/fa";
import {FaCircleCheck, FaEllipsisVertical} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {setModule} from "./modulesReducer";
import {setIsNew} from "../isNewReducer";
import DeleteModuleModal from "./DeleteModuleModal";
import ModuleModal from "./ModuleModal";

function ModuleList() {
    const {courseId} = useParams();
    const modules = useSelector((state) => state.modulesReducer.modules);
    const dispatch = useDispatch();

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
                                <FaCaretRight className="me-2"/>
                                <div className="w-100">{module.name} - {module.description}</div>
                                <button type="button" className="btn btn-success me-1 top-button"
                                        data-bs-toggle="modal" data-bs-target="#moduleModal"
                                        onClick={() => {
                                            dispatch(setIsNew(false));
                                            dispatch(setModule(module));
                                        }}>
                                    Edit
                                </button>
                                <button type="button" className="btn btn-danger me-2" data-bs-toggle="modal"
                                        data-bs-target="#deleteModuleModal"
                                        onClick={() => dispatch(setModule(module))}>
                                    Delete
                                </button>
                                <FaCircleCheck style={{color: '#008242'}}/>
                                <FaCaretDown className="me-3"/>
                                <FaPlus className="me-1"/>
                                <FaEllipsisVertical className="ms-3"/>
                            </li>
                        ))
                }
            </ul>

            <ModuleModal/>
            <DeleteModuleModal/>

        </div>
    );
}

export default ModuleList;