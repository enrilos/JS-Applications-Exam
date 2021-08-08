import authService from "./authApi.js";

export async function jsonRequest(url, method, body, isAuthorized, skipJsonResult) {
    if (method === undefined) {
        method = 'Get';
    }

    const headers = {};

    if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
        headers['Content-Type'] = 'application/json';
    }

    if (isAuthorized) {
        headers['X-Authorization'] = authService.getAuthToken();
    }

    const options = {
        method,
        headers
    }

    if (body !== undefined) {
        options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`${response.status} ${response.statusText}\n${message}`);
    }

    if (!skipJsonResult) {
        return await response.json();
    }
}