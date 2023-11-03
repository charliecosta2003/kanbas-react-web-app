import {deleteModule} from "./modulesReducer";
import {useDispatch, useSelector} from "react-redux";

function DeleteModuleModal() {
    const dispatch = useDispatch();
    const module = useSelector((state) => state.modulesReducer.module);

    return (
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
    );
}

export default DeleteModuleModal;