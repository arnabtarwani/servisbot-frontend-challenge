/**
 * This is a wrapper function is used to make API requests to the server
 * @param url 
 * @param method 
 * @param data - optional (this is for POST requests)
 * @returns {response from the server}
 */
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