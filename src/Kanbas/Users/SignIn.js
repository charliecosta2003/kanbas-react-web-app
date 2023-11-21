import * as client from "./client";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
function SignIn() {
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate("../Account");
    };
    return (
        <div>
            <h1>Signin</h1>
            <input value={credentials.username}
                   onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
            <input value={credentials.password}
                   onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
            <button onClick={signin}> Sign In</button>
        </div>
    );
}

export default SignIn;