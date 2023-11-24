import * as client from "./client";
import {useEffect, useState} from "react";
import {
    BsCheck,
    BsPencil,
    BsPlus,
    BsTrash3Fill
} from "react-icons/bs";
import {Link} from "react-router-dom";
import {BiEraser} from "react-icons/bi";
import {Navigate} from "react-router";

const blankUser = {
    username: "", password: "", firstName: "", lastName: "", role: "USER"
};

function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(blankUser);
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const createUser = async () => {
        if (user._id)
            setError("User already exists.");
        else if (!user.username || !user.password)
            setError("Username and/or password cannot be blank.");
        else {
            try {
                const newUser = await client.createUser(user);
                setUsers([newUser, ...users]);
                setUser(blankUser);
            } catch (err) {
                console.log(err);
                setError(err.response.data.message);
            }
        }
    };

    const checkIfAdmin = async () => {
        const signedInUser = await client.account();
        if (signedInUser.role === "ADMIN")
            setIsAdmin(true);
    }

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const selectUser = async (user) => {
        setUser(blankUser);
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };

    const updateUser = async () => {
        if (!user._id)
            setError("No user selected.");
        else if (!user.username || !user.password)
            setError("Username and/or password cannot be blank.");
        else {
            try {
                const status = await client.updateUser(user);
                setUsers(users.map((u) => (u._id === user._id ? user : u)));
                setUser(blankUser);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUsers();
            await checkIfAdmin();
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            {!loading && <>
                {isAdmin
                    ? <div className="table-responsive">
                        <h1>User List</h1>
                        {error &&
                            <div className="alert alert-danger">
                                {error}
                                <button type="button" className="btn-close float-end"
                                        onClick={() => setError("")}></button>
                            </div>}
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                            <tr>
                                <td className="align-middle">
                                    <div className="d-flex flex-nowrap justify-content-center">
                                        <input value={user.username}
                                               className="form-control me-2"
                                               style={{width: "200px"}}
                                               onChange={(e) => setUser({...user, username: e.target.value})}/>
                                        <input value={user.password}
                                               className="form-control"
                                               style={{width: "200px"}}
                                               onChange={(e) => setUser({...user, password: e.target.value})}/>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex flex-nowrap justify-content-center">
                                        <input value={user.firstName}
                                               className="form-control"
                                               style={{width: "200px"}}
                                               onChange={(e) => setUser({...user, firstName: e.target.value})}/>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex flex-nowrap justify-content-center">
                                        <input value={user.lastName}
                                               className="form-control"
                                               style={{width: "200px"}}
                                               onChange={(e) => setUser({...user, lastName: e.target.value})}/>
                                    </div>
                                </td>
                                <td>
                                    <select value={user.role}
                                            className="form-select"
                                            onChange={(e) => setUser({...user, role: e.target.value})}>
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="FACULTY">Faculty</option>
                                        <option value="STUDENT">Student</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="btn btn-success rounded-circle p-0 me-2"
                                            onClick={updateUser}
                                            title="Update User">
                                        <BsCheck className="fs-1"/>
                                    </button>
                                    <button className="btn btn-primary rounded-circle p-0 me-2"
                                            onClick={createUser}
                                            title="Create User">
                                        <BsPlus className="fs-1"/>
                                    </button>
                                    <button className="btn btn-danger rounded-circle p-0"
                                            onClick={() => setUser(blankUser)}
                                            title="Clear">
                                        <BiEraser className="fs-1"/>
                                    </button>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td><Link to={`/Kanbas/Account/${user._id}`}>{user.username}</Link></td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>
                                        <button className="btn btn-danger me-2"
                                                onClick={() => deleteUser(user)}>
                                            <BsTrash3Fill/>
                                        </button>
                                        <button className="btn btn-warning me-2"
                                                onClick={() => selectUser(user)}>
                                            <BsPencil/>
                                        </button>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    : <Navigate to={"/Kanbas/Account"}/>
                } </>}
        </>
    );
}

export default UserTable;