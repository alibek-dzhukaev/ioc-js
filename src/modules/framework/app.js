import IoC from "./ioc.js";
import appConfig from "../../config/app.js";
import {ServiceProvider} from "./service-provider.js";
import {Logger} from "./logger.js";
import {Router} from "../routing/router.js";

export class App {
    /**
     * @returns {IoC}
     */
    run() {
        const ioc = new IoC()

        for (const serviceProvider of appConfig.providers) {
            if (!(serviceProvider instanceof ServiceProvider)) {
                console.error(
                    'Incorrect type of service provider',
                    serviceProvider
                )
                throw new Error('Incorrect type of service provider')
            }

            serviceProvider.register(ioc)
        }

        /**
         * @type {Router}
         */
        const router = ioc.use(Router)
        router.init()

        /**
         * @type {Logger}
         */
        const logger = ioc.use(Logger)

        logger.info('App successfully run')

        return ioc
    }
}