import { UsersInterface } from "../../Interfaces/User/UserInterface";

export async function getDataService(token: string): Promise<UsersInterface> {
    return fetch("http://localhost:5000/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
        return response.json();
    });
}
