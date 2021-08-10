import authApi from "../../common/authApi.js";
import { loginTemplate } from "./loginTemplate.js";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function submitHandler(context, e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('password');

    if(!validateEmail(email) || !password) {
        window.alert('All fields must be valid.');
        return;
    }

    const user = {
        email,
        password
    }

    await authApi.login(user);
    context.page.redirect('/dashboard');
}

function getView(context) {
    const boundSubmitHandler = submitHandler.bind(null, context);
    context.renderView(loginTemplate(boundSubmitHandler));
}

export default {
    getView
}