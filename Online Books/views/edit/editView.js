import bookService from "../../services/bookService.js";
import { editTemplate } from "./editTemplate.js";

async function submitHandler(context, id, e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');
    const type = formData.get('type');

    if(!title || !description || !imageUrl || !type) {
        window.alert('All fields must be valid.');
        return;
    }

    const book = {
        title,
        description,
        imageUrl,
        type
    };

    await bookService.update(book, id);
    context.page.redirect(`details/${id}`);
}

async function getView(context) {
    const id = context.params.id;
    const book = await bookService.get(id);
    const boundSubmitHandler = submitHandler.bind(null, context, id);
    context.renderView(editTemplate(book, boundSubmitHandler));
}

export default {
    getView
}