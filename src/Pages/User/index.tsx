import { useState, useEffect } from "react";
import userImage from "../../Assets/Images/userImg.png";
import logoutImage from "../../Assets/Images/logoutImg.png";
import { useNavigate } from "react-router-dom";
import { UsersInterface } from "../../Interfaces/User/UserInterface";
import { getDataService } from "../../Services/User/UserService";

import "./styles.scss";

export function User() {
    const token = localStorage.getItem("@token");

    const [user, setUsers] = useState<UsersInterface>();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getDataService(token).then((data) => {
                setUsers(data);
            });
        } else {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <div className="mainContent">
            <div className="container">
                <header className="header">
                    <h2>Users</h2>
                    <div className="logout">
                        <img
                            alt="logout"
                            src={logoutImage}
                            style={{ height: 40, width: 40 }}
                            onClick={() => {
                                window.localStorage.removeItem("@token");
                                navigate("/");
                            }}
                        />
                        <p>Logout</p>
                    </div>
                </header>
                <div className="userCard">
                    <div className="userName">
                        <div className="userImage">
                            <img
                                alt="user"
                                src={userImage}
                                style={{ height: 50, width: 50 }}
                            />
                        </div>
                        <div>
                            <span className="spanName">Username</span>
                            <p>{user?.username}</p>
                        </div>
                    </div>

                    <div className="userId">
                        <span className="spanId">ID</span>
                        <p>{user?.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
