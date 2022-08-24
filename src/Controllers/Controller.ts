import { AxiosResponse } from "axios";

export async function Controller<T>(
    exec: Promise<AxiosResponse<T>>,
    successMessage?: string | ((res: T) => string)
) {
    return exec
        .then((res) => {
            const responseMessage: string | undefined = (res.data as any)
                .message;

            return res.data;
        })
        .catch((err) => {
            throw err;
        });
}
