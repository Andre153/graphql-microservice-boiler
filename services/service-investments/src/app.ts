import * as cors from 'cors'
import express = require('express')
import {ApolloServer} from 'apollo-server-express'
import {buildFederatedSchema} from '@apollo/federation'
import {investmentTypeDefs} from './schema/schema'
import {investmentResolvers} from './resolver/investment.resolver'

class App {

    public app: express.Application
    private GRAPH_PATH = '/api'

    constructor() {
        this.app = express()
        this._configureCORS()
        this._configureGraph()
    }

    private _configureCORS() {
        this.app.use(cors())
    }

    private _configureGraph(): void {
        const app = this.app
        const server = new ApolloServer({
            schema: buildFederatedSchema([{
                typeDefs: investmentTypeDefs,
                resolvers: investmentResolvers
            }
            ]),
        })
        server.applyMiddleware({
            app,
            path: this.GRAPH_PATH
        })

    }
}

export default new App().app
