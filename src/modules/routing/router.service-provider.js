import {ServiceProvider} from "../framework/service-provider.js";
import {Router} from "./router.js";
import {RouteCollection} from "./route-collection.js";
import {NotFoundRoute} from "./not-found.route.js";

class RouterServiceProvider extends ServiceProvider {
    /**
     * @param {IoC} ioc
     */
    register(ioc) {
        ioc.singleton(
            Router,
            () => new Router(ioc)
        )

        ioc.singleton(
            RouteCollection,
            () => new RouteCollection(ioc)
        )

        ioc.resolving(
            RouteCollection,
            ctx => {
                /**
                 * @type {RouteCollection}
                 */
                const routeCollection = ctx.instance;
                routeCollection.addRoute(
                    new NotFoundRoute()
                )
                return routeCollection
            }
        )
    }
}

export const routingServiceProvider = new RouterServiceProvider()