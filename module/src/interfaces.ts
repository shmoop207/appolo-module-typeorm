import {ConnectionOptions} from "typeorm";
import {EntitySchema} from "typeorm";

export interface IOptions {
    id?: string,
    config: ConnectionOptions
}

export interface GetAllParams<T> {
    page?: number,
    pageSize?: number,
    sort?: {
        [index: string]: number
    },
    filter?: {path: string, value: {[index: string]: any}}[],
    fields?: string[],
    search?: string;
}
