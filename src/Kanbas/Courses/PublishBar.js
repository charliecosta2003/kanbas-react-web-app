import {FaCircleCheck, FaEllipsisVertical} from "react-icons/fa6";
import {FaPlus} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {setModule} from "./Modules/modulesReducer";
import {setIsNew} from "./isNewReducer";

function PublishBar() {

    const dispatch = useDispatch();
    const initialModule = useSelector((state) => state.modulesReducer.initialModule);

    return (
        <div>
            <div className="d-flex flex-nowrap justify-content-end">
                <button className="btn grey-button me-1 top-button">Collapse All</button>
                <button className="btn grey-button me-1 top-button">View Progress</button>
                <div>
                    <FaCircleCheck id="select-publish-icon" className="float-end position-absolute"
                                   style={{color: "#008242"}}></FaCircleCheck>
                    <select className="form-select grey-button me-1 top-button" id="select-publish">
                        <option selected value="PUBLISH ALL">Publish All</option>
                    </select>
                </div>
                <button type="button" className="btn btn-danger me-1 top-button"
                        data-bs-toggle="modal" data-bs-target="#moduleModal"
                        onClick={() => {
                            dispatch(setIsNew(true));
                            dispatch(setModule({...initialModule}));
                        }}>
                    <FaPlus className="me-1 mb-1"></FaPlus>
                    Module
                </button>
                <button className="btn grey-button top-button">
                    <FaEllipsisVertical className="mb-1" style={{color: "#292b2d"}}></FaEllipsisVertical>
                </button>
            </div>
            <hr/>
        </div>
    );
}

export default PublishBar;