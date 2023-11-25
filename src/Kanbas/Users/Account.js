import * as client from "./client";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

function Account({setIsSignedIn}) {
    const {id} = useParams();
    const [account, setAccount] = useState();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [savedAccount, setSavedAccount] = useState(null);

    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
        setSavedAccount(account);
        if (account.dob) {
            const updatedAccount = {...account, dob: account.dob.substring(0, 10)};
            setAccount(updatedAccount);
            setSavedAccount(updatedAccount);
        }
    };

    const save = async () => {
        if (!account.password)
            setError("Password cannot be blank.");
        else {
            if (!id) {
                await client.updateUser(account, "true");
            } else {
                await client.updateUser(account, "false");
            }
            setSavedAccount(account);
        }
    };

    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
        setSavedAccount(user);
        if (user.dob) {
            const updatedAccount = {...user, dob: user.dob.substring(0, 10)};
            setAccount(updatedAccount);
            setSavedAccount(updatedAccount);
        }
    };

    const signout = async () => {
        await client.signout();
        setIsSignedIn(false);
        navigate("/Kanbas/signin");
    };

    useEffect(() => {
        if (id) {
            findUserById(id);
        } else {
            fetchAccount();
        }
    }, [id]);

    return (
        <>
            <h1>Account</h1>
            <div className="d-flex justify-content-center">
                {savedAccount && account && (
                    <div style={{"width": "300px"}} className="border border-dark rounded p-3">
                        <label htmlFor="account-username" className="form-label mb-1">
                            Username
                        </label>
                        <input value={account.username}
                               id="account-username"
                               className="form-control mb-2"
                               disabled
                        />
                        <label htmlFor="account-password" className="form-label mb-1">
                            Password
                        </label>
                        <input value={account.password}
                               id="account-password"
                               className="form-control mb-2"
                               onChange={(e) => setAccount({...account, password: e.target.value})}
                               disabled={id !== undefined}
                        />
                        <label htmlFor="account-firstName" className="form-label mb-1">
                            First Name
                        </label>
                        <input value={account.firstName}
                               id="account-firstName"
                               className="form-control mb-2"
                               onChange={(e) => setAccount({...account, firstName: e.target.value})}
                               disabled={id !== undefined}
                        />
                        <label htmlFor="account-lastName" className="form-label mb-1">
                            Last Name
                        </label>
                        <input value={account.lastName}
                               id="account-lastName"
                               className="form-control mb-2"
                               onChange={(e) => setAccount({...account, lastName: e.target.value})}
                               disabled={id !== undefined}
                        />
                        <label htmlFor="account-dob" className="form-label mb-1">
                            Date of Birth
                        </label>
                        <input value={account.dob} type="date"
                               id="account-dob"
                               className="form-control mb-2"
                               onChange={(e) => setAccount({...account, dob: e.target.value})}
                               disabled={id !== undefined}
                        />
                        <label htmlFor="account-email" className="form-label mb-1">
                            Email
                        </label>
                        <input value={account.email}
                               id="account-email"
                               className="form-control mb-2"
                               onChange={(e) => setAccount({...account, email: e.target.value})}
                               disabled={id !== undefined}
                        />
                        <label htmlFor="account-role" className="form-label mb-1">
                            Role
                        </label>
                        <select id="account-role" className="form-select mb-4"
                                onChange={(e) => setAccount({...account, role: e.target.value})}
                                disabled={id !== undefined}
                                value={account.role}
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </select>
                        {!id &&
                            <button className="btn btn-primary w-100 mb-2" onClick={save}>
                                Save
                            </button>}
                        {error && <div className="alert alert-danger">{error}</div>}
                        {!id &&
                            <button className="btn btn-danger w-100 mb-2" onClick={signout}>
                                Sign Out
                            </button>
                        }
                        {!id && savedAccount.role === "ADMIN" &&
                            <Link to="../admin/users" className="btn btn-warning w-100">
                                Users
                            </Link>}
                    </div>)}
            </div>
        </>
    )
        ;
}

export default Account;