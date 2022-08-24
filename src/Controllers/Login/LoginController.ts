import { LoginBody } from "../../Interfaces/Login/LoginInterface";
import { LoginService } from "../../Services/Login/LoginService";
import { Controller } from "../Controller";

export async function LoginController(requestBody: LoginBody) {
    return Controller(LoginService(requestBody));
}
