"use strict";
import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {Discovery} from '@appolo/engine';
import { IApp} from '@appolo/core';
import {ILogger} from "@appolo/logger";
import {createConnection} from "typeorm";
import {Connection} from "typeorm";
import {IOptions} from "./interfaces";
import _ = require('lodash');
import {ModelKey} from "./decorator";

@define()
@singleton()
@factory()
export class Client implements IFactory<Connection> {

    @inject() logger: ILogger;
    @inject() moduleOptions: IOptions;
    @inject() app: IApp;

    public async get(): Promise<Connection> {

        try {

            let modules = this.app.tree.parent.discovery.findAllReflectData<string>(ModelKey);

            let entities = _.map(modules, module => module.fn);

            let config = _.defaults({}, this.moduleOptions.config, {synchronize: true, type: "postgres", entities});

            const client = await createConnection(config);

            this.logger.info(`connected to ${this.moduleOptions.id}`);

            return client;

        } catch (e) {
            this.logger.error(`failed to connect to ${this.moduleOptions.id}`, {err: e.toString()});
            throw e;
        }
    }
}
