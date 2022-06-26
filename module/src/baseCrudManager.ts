"use strict";
import {ReadStream} from "fs";
import {Repository, SelectQueryBuilder} from "typeorm";
import {GetAllParams} from "./interfaces";

export abstract class BaseCrudManager<K> {


    protected abstract _repo: Repository<K>;

    public async getById(id: string) {
        return this._repo.findOneBy({id} as any);
    }

    public async getAllToStream(params: GetAllParams<Partial<K>> = {}): Promise<ReadStream> {
        const {query} = await this._buildQueryForGetAll(params);

        return query.stream();

    }

    public async getAll(params: GetAllParams<Partial<K>> = {}): Promise<{ results: [], count: number }> {

        const {query, count} = await this._buildQueryForGetAll(params);

        const results = await query.execute();
        return {results, count: count || results.length};
    }

    private async _buildQueryForGetAll(params: GetAllParams<Partial<K>> = {}): Promise<{ query: SelectQueryBuilder<K>, count: number }> {

        const query = this._repo.createQueryBuilder()
            .select(params.fields || [])

        if (params.filter && params.filter.length > 0) {
            for (let filter of params.filter) {
                query.andWhere(filter.path, filter.value)
            }
        }

        if (params.sort) {
            const orderBy = Object.keys(params.sort)[0];
            const orders = (params.sort[orderBy] === -1) ? "DESC" : "ASC";
            query.orderBy(orderBy, orders);
        }

        let count;
        if (params.pageSize && params.page) {
            count = await query.getCount();
            query.skip((params.pageSize || 0) * ((params.page || 0) - 1))
                .take(params.pageSize || 0);
        }

        return {query, count}
    }

}
