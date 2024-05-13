import {ServiceProvider} from "../framework/service-provider.js";
import {ConsoleLogger} from "./console-logger.js";
import {Logger} from "../framework/logger.js";

class ConsoleLoggerServiceProvider extends ServiceProvider {
    /**
     *
     * @param {IoC} ioc
     */
    register(ioc) {
        ioc.singleton(
            Logger,
            () => new ConsoleLogger(ioc)
        )
    }
}

export const consoleLoggerServiceProvider = new ConsoleLoggerServiceProvider()