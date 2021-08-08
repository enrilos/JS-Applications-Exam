import bookService from "../../services/bookService.js";
import { dashboardTemplate } from "./dashboardTemplate.js";

async function getView(context) {
    const allBooks = await bookService.getAll();
    context.renderView(dashboardTemplate(allBooks));
}

export default {
    getView
}