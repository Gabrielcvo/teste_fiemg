export default async function Service<T>(exec: Promise<T>) {
    return exec.catch((err) => {
        throw err.response;
    });
}
