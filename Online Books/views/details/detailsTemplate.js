import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

export const detailsTemplate = (book, isOwner, likeInfo, likeHandler) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${
                isOwner
                ?
                html`
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a class="button" href="/delete/${book._id}">Delete</a>`
                :
                nothing
            }
            
            ${
                !isOwner && likeInfo.isLoggedIn && !likeInfo.hasLiked
                ?
                html`<a class="button" href="#" @click=${likeHandler}>Like</a>`
                :
                nothing
            }
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likeInfo.totalLikes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;