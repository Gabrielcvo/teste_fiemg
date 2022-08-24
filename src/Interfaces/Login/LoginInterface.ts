export interface LoginBody {
    username: string;
    password: string;
}

export interface LoginResponse {
    data: { token: string };
    message: string;
    status: "SUCCESS" | "ERROR";
}
