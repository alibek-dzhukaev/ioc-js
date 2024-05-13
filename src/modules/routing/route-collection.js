import {Route} from "./route.js";

export class RouteCollection {
    constructor(ioc) {
        const routes = []

        this.getRoutes = () => [...routes]

        this.addRoute = route => {
            if (!(route instanceof Route)) {
                throw new Error('invalid type error')
            }

            routes.push(route)
        }
    }
}