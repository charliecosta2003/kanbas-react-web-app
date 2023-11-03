import {useParams} from "react-router-dom";
import {FaCaretDown, FaCaretRight, FaGripVertical, FaPlus} from "react-icons/fa";
import {FaCircleCheck, FaEllipsisVertical} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {addModule, deleteModule, setModule, updateModule} from "./modulesReducer";
import {setIsNew} from "../isNewReducer";

function ModuleList() {
    const {courseId} = useParams();
    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);
    const dispatch = useDispatch();
    const isNew = useSelector((state) => state.isNewReducer.isNew);

    const handleSave = () => {
        if (isNew) {
            dispatch(addModule({...module, course: courseId}));
        } else {
            dispatch(updateModule(module));
        }
    }


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

            <div className="modal fade" id="moduleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">
                                {isNew ? "Create New Module" : "Edit Module"}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control"
                                   value={module.name}
                                   onChange={(e) =>
                                       dispatch(setModule({...module, name: e.target.value}))}
                            />
                            <textarea className="form-control mt-2"
                                      style={{"height": "100px"}}
                                      value={module.description}
                                      onChange={(e) =>
                                          dispatch(setModule({...module, description: e.target.value}))}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteModuleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Delete Module</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this module?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => dispatch(deleteModule(module._id))}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ModuleList;