import {
    LoginBody,
    LoginResponse,
} from "../../Interfaces/Login/LoginInterface";

export async function LoginService(data: LoginBody): Promise<LoginResponse> {
    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}
