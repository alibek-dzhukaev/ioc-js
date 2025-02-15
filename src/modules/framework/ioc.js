export default class IoC {

    constructor() {
        this._resolvers = {}
        this._isSingleton = {}
        this._resolvingHandlers = {}
        this._resolvedInstances = {}
    }
    use(token) {
        if (!this._resolvers[token]) {
            throw new Error(`Not found Error. Resolver for token ${token} does not exist`)
        }

        if (this._resolvedInstances[token]) {
            return this._resolvedInstances[token]
        }

        let instance = this._resolvers[token](this)

        const handlers = this._resolvingHandlers[token] || []

        for (const handler of handlers) {
            instance = handler({instance, ioc: this})
        }

        if (this._isSingleton[token]) {
            this._resolvedInstances[instance] = instance
        }

        return instance
    }

    bind(token, resolver) {
        this._resolvers[token] = resolver
    }

    singleton(token, resolver) {
        this._isSingleton[token] = true
        this.bind(token, resolver)
    }

    resolving(token, handler) {
        this._resolvingHandlers[token] = this._resolvingHandlers[token]
            ? [...this._resolvingHandlers[token], handler]
            : [handler]
    }

    register(serviceProvider) {
        serviceProvider.register(this)
    }

}