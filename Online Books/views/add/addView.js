import bookService from "../../services/bookService.js";
import { addTemplate } from "./addTemplate.js";

async function submitHandler(context, e) {
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

    await bookService.create(book);
    context.page.redirect('/dashboard');
}

function getView(context) {
    const bindedSubmitHandler = submitHandler.bind(null, context);
    context.renderView(addTemplate(bindedSubmitHandler));
}

export default {
    getView
}