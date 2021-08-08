import bookService from "../../services/bookService.js";
import authApi from "../../common/authApi.js";
import { myBooksTemplate } from "./myBooksTemplate.js";

async function getView(context) {
    const books = await bookService.getUserBooks(authApi.getUserId());
    context.renderView(myBooksTemplate(books));
}

export default {
    getView
}