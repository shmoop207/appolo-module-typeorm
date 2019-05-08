"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("appolo/index");
const typeorm_1 = require("typeorm");
let Client = class Client {
    async get() {
        try {
            const client = await typeorm_1.createConnection({
                type: "postgres",
                url: this.moduleOptions.config.url,
                ssl: this.moduleOptions.config.ssl,
                entities: this.moduleOptions.entities,
                synchronize: true
            });
            this.logger.info(`connected to ${this.moduleOptions.id}`);
            return client;
        }
        catch (e) {
            this.logger.error(`failed to connect to ${this.moduleOptions.id}`, { err: e.toString() });
            throw e;
        }
    }
};
tslib_1.__decorate([
    index_1.inject()
], Client.prototype, "logger", void 0);
tslib_1.__decorate([
    index_1.inject()
], Client.prototype, "moduleOptions", void 0);
Client = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.factory()
], Client);
exports.Client = Client;
//# sourceMappingURL=client.js.map