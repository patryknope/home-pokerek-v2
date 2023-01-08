import {ApiError} from "./ApiError";

type HttpMethod = "GET" | "PUT" | "POST" | "DELETE"

export const GET = "GET"
export const PUT = "PUT"
export const POST = "POST"
export const DELETE = "DELETE"
const methods = [GET, PUT, POST, DELETE]

async function performRequest(
    method: HttpMethod,
    url: string,
    body?: any,
    customHeaders?: { [k: string]: string }
): Promise<Response> {
    if (!methods.includes(method)) {
        throw new Error(`invalid method ${method}, not performing the request`);
    }
    if (method === undefined) {
        throw new Error("method can't be undefined");
    } else if (method === null) {
        throw new Error("Method cant be null");
    }

    if (url === undefined) {
        throw new Error("url cant be undefined")
    } else if (url === null) {
        throw new Error("url cant be null")
    }
    const headers = await getHeaders();
    if (customHeaders) {
        const keys = Object.keys(customHeaders);
        keys.forEach((key) => {
            headers.set(key, customHeaders[key]);
        })
    }
    const options = {
        method,
        headers,
        body,
    };
    const apiUrl = "";
    const fullUrl = `${apiUrl}${url}`
    return fetch(new Request(fullUrl, options))
}
export async function performRequestWithTypedResponse<T>(
    method: HttpMethod,
    url: string,
    body?: any,
    customHeaders?: {[k: string]: string}
): Promise<T> {
    return performRequest(method,url,body,customHeaders).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return handleError(response);
        }
    });
}
export async function performRequestWithNoResponse(
    method: HttpMethod,
    url: string,
    body?: any,
    customHeaders?: {[k: string]: string}
): Promise<void> {
    return performRequest(method, url,body, customHeaders).then((response) => {
        if (response.ok) {
            return;
        } else {
            return handleError(response)
        }
    });
}
function handleError(response: Response) {
    return response
        .json()
        .then((err: {message: string}) => {
            return {status: response.status, message: err.message};
        })
        .catch((_) => {
            return {
                status: response.status,
                message: "An unexpected error occurred!",
            };
        })
        .then((error: ApiError) => {
            throw error;
        });
}
async function getHeaders(): Promise<Headers> {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
}