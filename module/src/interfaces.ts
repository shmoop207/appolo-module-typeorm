import {ConnectionOptions} from "typeorm";
import {EntitySchema} from "typeorm";
import {IModuleOptions} from "appolo";

export interface IOptions extends IModuleOptions {
    id?: string,
    config: ConnectionOptions
}
