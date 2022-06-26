"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCrudManager = void 0;
class BaseCrudManager {
    async getById(id) {
        return this._repo.findOneBy({ id });
    }
    async getAllToStream(params = {}) {
        const { query } = await this._buildQueryForGetAll(params);
        return query.stream();
    }
    async getAll(params = {}) {
        const { query, count } = await this._buildQueryForGetAll(params);
        const results = await query.execute();
        return { results, count: count || results.length };
    }
    async _buildQueryForGetAll(params = {}) {
        const query = this._repo.createQueryBuilder()
            .select(params.fields || []);
        if (params.filter && params.filter.length > 0) {
            for (let filter of params.filter) {
                query.andWhere(filter.path, filter.value);
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
        return { query, count };
    }
}
exports.BaseCrudManager = BaseCrudManager;
//# sourceMappingURL=baseCrudManager.js.map