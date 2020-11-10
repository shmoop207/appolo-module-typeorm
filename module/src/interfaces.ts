import {ConnectionOptions} from "typeorm";
import {EntitySchema} from "typeorm";

export interface IOptions {
    id?: string,
    config: ConnectionOptions
}
