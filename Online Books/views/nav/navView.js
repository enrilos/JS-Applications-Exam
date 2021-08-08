import authApi from "../../common/authApi.js";
import { navTemplate } from "./navTemplate.js";

function getView(context, next) {
    context.renderNav(navTemplate(authApi.isLoggedIn(), authApi.getEmail()));
    next();
}

export default {
    getView
}