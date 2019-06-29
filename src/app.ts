import {ApolloGateway, RemoteGraphQLDataSource} from '@apollo/gateway'
import {ApolloServer} from 'apollo-server-express'
import * as cors from 'cors'
import express = require('express')
import {Context} from './types/types'
import {serviceList} from './config/service.config'

class App {

    public app: express.Application
    private GRAPH_PATH = '/api/graphql'

    constructor() {
        this.app = express()
        this._configureCORS()
        this._initApollo()
    }

    private _configureCORS() {
        this.app.use(cors())
    }

    private async _initApollo() {
        const {schema, executor} = await new ApolloGateway({
            serviceList: serviceList,
            buildService({name, url}) {
                return new RemoteGraphQLDataSource({
                    url,
                    // @ts-ignore
                    willSendRequest({request, context}) {
                        request.http.headers.set('role', context['role'])
                        request.http.headers.set('token', context['token'])
                    },
                })
            },
        }).load()

        const server = new ApolloServer({
            schema,
            executor: executor as any,
            context: ({req}): Context => {
                return {
                    user: {
                        role: req.headers['role'],
                        token: req.headers['token'],
                    },
                }
            },
        }) as any

        server.applyMiddleware({
            app: this.app,
            path: this.GRAPH_PATH,
        })
    }
}

export default new App().app
