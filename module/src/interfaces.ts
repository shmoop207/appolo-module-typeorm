import {DataSourceOptions} from "typeorm";
import {EntitySchema} from "typeorm";

export interface IOptions {
    id?: string,
    config: DataSourceOptions
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
