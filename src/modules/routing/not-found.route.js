import {Route} from "./route.js";

export class NotFoundRoute extends Route {
    isMatch(hash) {
        return true
    }

    sortOrder() {
        return 999999;
    }

    render() {
        console.log('not found route works!')
    }
}