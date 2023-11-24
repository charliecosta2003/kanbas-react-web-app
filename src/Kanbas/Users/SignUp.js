import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as client from "./client";

function Signup({setIsSignedIn}) {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: ""
    });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(credentials);
            setIsSignedIn(true);
            navigate("/Kanbas/Account");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div style={{"width": "300px"}}>
                <h1 className="mt-5">Sign Up</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="border border-dark rounded p-3">
                    <label htmlFor="signup-username" className="form-label">
                        Username
                    </label>
                    <input
                        id="signup-username"
                        value={credentials.username}
                        className="form-control"
                        onChange={(e) => setCredentials({
                            ...credentials,
                            username: e.target.value
                        })}/>
                    <label htmlFor="signup-password" className="form-label">
                        Password
                    </label>
                    <input
                        id="signup-password"
                        type="password"
                        value={credentials.password}
                        className="form-control"
                        onChange={(e) => setCredentials({
                            ...credentials,
                            password: e.target.value
                        })}/>
                    <button className="btn btn-primary mt-3 w-100" onClick={signup}>
                        Sign Up
                    </button>
                </div>
                <h6 className="mt-3">
                    Already have an account?
                    <Link to={"/Kanbas/signin"}
                          className="link-primary link-underline-opacity-1 link-underline-opacity-100-hover ms-1">
                        Sign In
                    </Link>
                </h6>
            </div>
        </div>
    );
}

export default Signup;