import bookService from "../../services/bookService.js";
import authApi from "../../common/authApi.js";
import { detailsTemplate } from "./detailsTemplate.js";

async function likeHandler(context, bookId, e) {
    e.preventDefault();

    const body = {
        bookId
    };

    await bookService.likeBook(body);
    const newTotalLikes = await bookService.getBookLikes(bookId);
    e.target.remove();
    // Avoid doing this since detailsView is now coupled with document. I am doing it for the sake of the exam and time pressure.
    document.querySelector('#total-likes').textContent = `Likes: ${newTotalLikes}`;
}

async function getView(context) {
    const id = context.params.id;
    const book = await bookService.get(id);
    const isOwner = book._ownerId === authApi.getUserId();

    const bindedLikeHandler = likeHandler.bind(null, context, id);

    const likeInfo = {
        isLoggedIn: authApi.isLoggedIn(),
        hasLiked: await bookService.hasUserLikedBook(id, authApi.getUserId()) === 0 ? false : true,
        totalLikes: await bookService.getBookLikes(id)
    }

    context.renderView(detailsTemplate(book, isOwner, likeInfo, bindedLikeHandler));
}

export default {
    getView
}