import {addModule, setModule, updateModule} from "./modulesReducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import * as client from "./client";

function ModuleModal() {

    const {courseId} = useParams();
    const dispatch = useDispatch();
    const module = useSelector((state) => state.modulesReducer.module);
    const isNew = useSelector((state) => state.isNewReducer.isNew);

    const handleSave = async () => {
        if (isNew) {
            client.createModule(courseId, module).then((module) => {
                dispatch(addModule(module));
            });
            // const newModule = await client.createModule(courseId, module);
            // dispatch(addModule(newModule));
        } else {
            const status = await client.updateModule(module);
            dispatch(updateModule(module));
        }
    }

    return (
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
    );
}

export default ModuleModal;