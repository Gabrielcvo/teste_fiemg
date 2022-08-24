import { api } from "../../Config/api";
import { LoginBody } from "../../Interfaces/Login/LoginInterface";
import Service from "../Service";

export async function LoginService(requestBody: LoginBody) {
    return Service(api.post<{ bearer: string }>(`/login`, requestBody));
}
