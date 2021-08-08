import { jsonRequest } from "../common/jsonRequest.js";

const baseUrl = 'http://localhost:3030/data';

async function getAll() {
    return await jsonRequest(`${baseUrl}/books?sortBy=_createdOn%20desc`);
}

async function get(id) {
    return await jsonRequest(`${baseUrl}/books/${id}`);
}

async function getUserBooks(userId) {
    return await jsonRequest(`${baseUrl}/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

async function likeBook(body) {
    return await jsonRequest(`${baseUrl}/likes`, 'post', body, true);
}

async function getBookLikes(id) {
    return await jsonRequest(`${baseUrl}/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
}

async function hasUserLikedBook(bookId, userId) {
    // This check is mandatory owing to the fact that should userId be null, the request fails.
    if(userId === null || userId === undefined) {
        return 0;
    }
    return await jsonRequest(`${baseUrl}/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

async function create(book) {
    return await jsonRequest(`${baseUrl}/books`, 'Post', book, true);
}

async function update(book, id) {
    return await jsonRequest(`${baseUrl}/books/${id}`, 'Put', book, true);
}

async function deleteBook(id) {
    return await jsonRequest(`${baseUrl}/books/${id}`, 'Delete', undefined, true);
}

export default {
    getAll,
    get,
    getUserBooks,
    likeBook,
    getBookLikes,
    hasUserLikedBook,
    create,
    update,
    deleteBook
}