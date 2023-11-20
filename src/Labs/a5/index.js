import EncodingParametersInURLS from "./EncodingParametersInURLS";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";

const API_BASE = process.env.REACT_APP_API_BASE;
const LABS_URL = `${API_BASE}/a5`;

function Assignment5() {
    return (
        <div>
            <h1>Assignment 5</h1>
            <div className="list-group">
                <a href={`${LABS_URL}/welcome`}
                   className="list-group-item">
                    Welcome
                </a>
            </div>
            <EncodingParametersInURLS/>
            <WorkingWithObjects/>
            <WorkingWithArrays/>
        </div>
    );
}

export default Assignment5;