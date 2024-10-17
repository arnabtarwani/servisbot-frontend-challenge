export const api = async (url: string, method: string, data?: any) => {
    const response = await fetch(`http://localhost:4000/${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}