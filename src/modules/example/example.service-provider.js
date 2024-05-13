import {ServiceProvider} from "../framework/service-provider.js";
import {APP_CONFIG_TOKEN, APP_TITLE_TOKEN, ROUTERS_TOKEN} from "./constants.js";
import appConfig from "../../config/app.js";
import {ExampleService} from "./example.service.js";
import {RouteCollection} from "../routing/route-collection.js";
import {HomeRoute} from "./home.route.js";
import {AboutUsRoute} from "./about-us.route.js";

class ExampleServiceProvider extends ServiceProvider {
    register(ioc) {
        // string registration ( title of site )
        ioc.singleton(
            APP_TITLE_TOKEN,
            () => 'GromMax App'
        )

        ioc.resolving(
            APP_TITLE_TOKEN,
            ctx => `<h1>${ctx.instance}</h1>`
        )

        // config registration of application in IoC
        ioc.singleton(
            APP_CONFIG_TOKEN,
            () => {
                const {providers, ...config} = appConfig
                return config;
            }
        )

        ioc.resolving(
            APP_CONFIG_TOKEN,
            ctx => {
                // mutable approach
                // ctx.instance.title = ctx.ioc.use(APP_TITLE_TOKEN)
                // return ctx.instance

                return {
                    ...ctx.instance,
                    title: ctx.ioc.use(APP_TITLE_TOKEN)
                }
            }
        )

        // service registration, token === class
        ioc.singleton(
            ExampleService,
            () => new ExampleService(ioc)
        )

        // register of container for similar data
        ioc.singleton(
            ROUTERS_TOKEN,
            () => []
        )

        ioc.resolving(
            ROUTERS_TOKEN,
            ctx => {
                ctx.instance.push({
                    path: '/',
                    title: "HOME PAGE"
                })

                ctx.instance.push({
                    path: 'about-us',
                    title: 'ABOUT US'
                })
                return ctx.instance
            }
        )

        ioc.resolving(
            RouteCollection,
            ctx => {
                /**
                 * @type {RouteCollection}
                 */
                const routeCollection = ctx.instance;
                routeCollection.addRoute(
                    new HomeRoute()
                )
                routeCollection.addRoute(
                    new AboutUsRoute()
                )
                return routeCollection
            }
        )
    }
}

export default new ExampleServiceProvider()