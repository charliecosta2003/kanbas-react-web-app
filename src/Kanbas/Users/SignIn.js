import * as client from "./client";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function SignIn({setIsSignedIn}) {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const navigate = useNavigate();
    const signin = async () => {
        try {
            await client.signin(credentials);
            setIsSignedIn(true);
            navigate("../Account");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div style={{"width": "300px"}}>
                <h1 className="mt-5">Sign In</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="border border-dark rounded p-3">
                    <label htmlFor="signin-username" className="form-label">
                        Username
                    </label>
                    <input value={credentials.username}
                           onChange={(e) => setCredentials(
                               {
                                   ...credentials,
                                   username: e.target.value
                               })}
                           className="form-control"
                           id="signin-username"/>
                    <label htmlFor="signin-password" className="form-label">
                        Password
                    </label>
                    <input value={credentials.password}
                           onChange={(e) => setCredentials(
                               {
                                   ...credentials, password: e.target.value
                               })}
                           className="form-control"
                           id="signin-password"
                           type="password"/>
                    <button className="btn btn-primary mt-3 w-100" onClick={signin}>Sign In</button>
                </div>
                <h6 className="mt-3">
                    Don't have an account?
                    <Link to={"/Kanbas/signup"}
                          className="link-primary link-underline-opacity-0 link-underline-opacity-100-hover ms-1">
                        Sign Up
                    </Link>
                </h6>
            </div>
        </div>
    );
}

export default SignIn;