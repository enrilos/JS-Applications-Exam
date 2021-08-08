import { html } from '../../node_modules/lit-html/lit-html.js';

export const navTemplate = (isLoggedIn, email) => html`
<nav class="navbar">
    <section class="navbar-dashboard">
        <a href="/dashboard">Dashboard</a>
        ${
            isLoggedIn
            ?
            html`
            <div id="user">
                <span>Welcome, ${email}</span>
                <a class="button" href="/myBooks">My Books</a>
                <a class="button" href="/add">Add Book</a>
                <a class="button" href="/logout">Logout</a>
            </div>`
            :
            html`
            <div id="guest">
                <a class="button" href="/login">Login</a>
                <a class="button" href="/register">Register</a>
            </div>`
        }
    </section>
</nav>`;