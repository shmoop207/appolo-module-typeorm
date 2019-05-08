import {define, inject, injectAlias, singleton} from 'appolo';
import {Connection, EntitySchema, ObjectType, BaseEntity, Repository} from "typeorm";

@define()
@singleton()
export class ModelRepository {
    @inject() private client: Connection;

    public get connection(): Connection {
        return this.client;
    }

    public getModel<T>(target: ObjectType<T> | EntitySchema<T> | string): Repository<T> {

        return this.connection.manager.getRepository(target)
    }
}
