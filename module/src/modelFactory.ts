import {IFactory} from 'appolo';
import {EntitySchema, Repository} from "typeorm";
import {Connection} from "typeorm";

export class ModelFactory implements IFactory<Repository<any>> {

    private model: EntitySchema<any>;
    private connection: Connection;

    public get() {
        return this.connection.manager.getRepository(this.model);
    }
}
