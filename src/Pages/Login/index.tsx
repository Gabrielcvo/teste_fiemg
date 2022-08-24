import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginBody } from "../../Interfaces/Login/LoginInterface";
import "./styles.scss";

import loginImage from "../../Assets/Images/loginImage.png";
import { LoginService } from "../../Services/Login/LoginService";

export function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    function handleLogin(data: LoginBody) {
        LoginService(data).then((response) => {
            const accessToken = response.data.token;
            localStorage.setItem("@token", accessToken);
            if (response.status === "SUCCESS") {
                navigate("/user");
            } else if (response.status === "ERROR") {
                setErrorMessage(response.message);
            }
        });
    }

    return (
        <div className="background">
            <div className="container">
                <div className="img">
                    <img src={loginImage} alt="Login" />
                </div>

                <form
                    //@ts-ignore
                    onSubmit={handleSubmit((formData) => handleLogin(formData))}
                    className="formLogin"
                >
                    <span className="formTitle">Member Login</span>

                    <input
                        {...register("username", {
                            required: "Please enter your username",
                        })}
                        name="username"
                        placeholder="Username"
                        className="loginInput"
                    />

                    <input
                        {...register("password", {
                            required: "Please enter your password",
                        })}
                        name="password"
                        placeholder="Password"
                        className="loginInput"
                    />

                    <button className="loginButton" type="submit">
                        LOGIN
                    </button>

                    {errorMessage && (
                        <span style={{ color: "red" }}>{errorMessage}</span>
                    )}
                </form>
            </div>
        </div>
    );
}
