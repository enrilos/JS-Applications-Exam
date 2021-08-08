// How do I get this working ?

// Fire up a terminal and type:
// npm i
// cd server
// node server.js

// Open up a second terminal and type:
// npm run start
// Open http://localhost:3000

// How to test ?
// Open up a third terminal and type:
// npm run test

import page from './node_modules/page/page.mjs';

import renderMiddleware from './common/renderMiddleware.js';
import authApi from './common/authApi.js';
import bookService from './services/bookService.js';

import navView from './views/nav/navView.js';
import loginView from './views/login/loginView.js';
import registerView from './views/register/registerView.js';
import addView from './views/add/addView.js';
import dashboardView from './views/dashboard/dashboardView.js';
import detailsView from './views/details/detailsView.js';
import editView from './views/edit/editView.js';
import myBooksView from './views/myBooks/myBooksView.js';

const navHeader = document.querySelector('#site-header');
const main = document.querySelector('#site-content');

renderMiddleware.initialize(navHeader, main);

page('/', '/dashboard');
page('/home', '/dashboard');
page('/index', '/dashboard');
page('/index.html', '/dashboard');

page('/login', renderMiddleware.configContext, navView.getView, loginView.getView);
page('/register', renderMiddleware.configContext, navView.getView, registerView.getView);
page('/logout', async (context) => { await authApi.logout(); context.page.redirect('/dashboard'); });
page('/add', renderMiddleware.configContext, navView.getView, addView.getView);
page('/dashboard', renderMiddleware.configContext, navView.getView, dashboardView.getView);
page('/details/:id', renderMiddleware.configContext, navView.getView, detailsView.getView);
page('/edit/:id', renderMiddleware.configContext, navView.getView, editView.getView);
page('/delete/:id', async (context) => {
    const askConfirm = confirm('Delete this record?');

    if (askConfirm) {
        await bookService.deleteBook(context.params.id);
        context.page.redirect('/dashboard');
    }
});
page('/myBooks', renderMiddleware.configContext, navView.getView, myBooksView.getView);

page.start();