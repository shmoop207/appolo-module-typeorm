"use strict";
import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {Discovery} from '@appolo/engine';
import {IApp} from '@appolo/core';
import {ILogger} from "@appolo/logger";
import {createConnection, DataSourceOptions} from "typeorm";
import {DataSource} from "typeorm";
import {Arrays, Objects} from "@appolo/utils";
import {IOptions} from "./interfaces";
import {ModelKey} from "./decorator";

@define()
@singleton()
@factory()
export class Client implements IFactory<DataSource> {

    @inject() logger: ILogger;
    @inject() moduleOptions: IOptions;
    @inject() app: IApp;

    public async get(): Promise<DataSource> {

        try {

            let modules = this.app.tree.parent.discovery.findAllReflectData<string>(ModelKey);

            let entities = modules.map(module => module.fn);

            let config: DataSourceOptions = Objects.defaults({}, this.moduleOptions.config as any, {
                synchronize: true,
                type: "postgres",
                entities
            });

            const client = new DataSource(config);

            await client.initialize();

            this.logger.info(`connected to ${this.moduleOptions.id}`);

            return client;

        } catch (e) {
            this.logger.error(`failed to connect to ${this.moduleOptions.id}`, {err: e.toString()});
            throw e;
        }
    }
}
