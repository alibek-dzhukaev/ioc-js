import {Logger} from "../framework/logger.js";

export class ConsoleLogger extends Logger {
    debug(...messages) {
        console.log(...messages)
    }

    info(...messages) {
        console.info(...messages)
    }

    error(...messages) {
        console.error(...messages)
    }
}