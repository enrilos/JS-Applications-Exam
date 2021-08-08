import { render } from '../node_modules/lit-html/lit-html.js';

let navContainer = undefined;
let viewContainer = undefined;

function initialize(navContainerElement, viewContainerElement){
    navContainer = navContainerElement;
    viewContainer = viewContainerElement;
}

async function renderNav(templateResult){
    render(templateResult, navContainer);
}

async function renderView(templateResult){
    render(templateResult, viewContainer);
}

// Adding 2 property methods to the page.js context so that the next() template in the middleware chain can use them.
function configContext(context, next){
    context.renderNav = renderNav;
    context.renderView = renderView;
    next();
}

export default {
    initialize,
    renderNav,
    renderView,
    configContext
}