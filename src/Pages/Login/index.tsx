import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../Config/api";
import AuthContext from "../../Context/AuthProvider";
import { LoginController } from "../../Controllers/Login/LoginController";
import useAsyncCallback from "../../Hooks/useAsyncCallback";
import { LoginBody } from "../../Interfaces/Login/LoginInterface";
import "./styles.scss";

export function Login() {
    const { setAuth } = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState("");
    const errRef = useRef();

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    const { execute: executeLogin } = useAsyncCallback(LoginController);

    async function handleLogin(formData: LoginBody) {
        try {
            const response = await api.post(
                "/login",
                JSON.stringify(formData),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },

                    withCredentials: true,
                }
            );
            //@ts-ignore

            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({ ...formData, accessToken });
        } catch (error) {
            console.error(error);
        }
        // catch (err) {
        //     if (!err as any) {
        //         setErrorMessage("No Server Response");
        //     } else if (err.response?.status === 400) {
        //         setErrorMessage("Missing Username or Password");
        //     } else if (err.response?.status === 401) {
        //         setErrorMessage("Unauthorized");
        //     } else {
        //         setErrorMessage("Login Failed");
        //     }
        //     errRef.current?.focus();
        // }
    }

    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    postData("http://localhost:5000/login", {
        username: "root",
        password: "123456",
    }).then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
    });

    // executeLogin({
    //     ...formData,
    //     password: formData.password,
    //     username: formData.username,
    // }).then((res) => console.log(res));

    // const loadUser = useCallback(async () => {
    //     const { data } = await api.post(`/login`);

    //     setUser(data);
    // }, []);

    // useEffect(() => {
    //     loadUser();
    // }, [loadUser]);

    // if (user) {
    //     console.log(user);
    // }

    return (
        <div className="background">
            <div className="container">
                <div className="img"></div>

                <form
                    onSubmit={handleSubmit((formData) =>
                        //@ts-ignore

                        handleLogin(formData)
                    )}
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
                </form>
            </div>
        </div>
    );
}
