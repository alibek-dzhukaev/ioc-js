import appConfig from "./src/config/app.js";
import {ServiceProvider} from "./src/modules/framework/service-provider.js";
import {APP_CONFIG_TOKEN, APP_TITLE_TOKEN, ROUTERS_TOKEN} from "./src/modules/example/constants.js";
import {ExampleService} from "./src/modules/example/example.service.js";
import {App} from "./src/modules/framework/app.js";

const app = new App()
const ioc = app.run()

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

/*
const appTitle = ioc.use(APP_TITLE_TOKEN)

console.log(appTitle)

const config = ioc.use(APP_CONFIG_TOKEN)

console.log(config)

/!**
 * @type {ExampleService}
 *!/
const exampleService = ioc.use(ExampleService)
exampleService.run()

console.log('example', exampleService)


const routers = ioc.use(ROUTERS_TOKEN)
console.log(routers)
for (const router of routers)
{
    console.log(`path: ${router.path} && title ${router.title}` )
}*/
