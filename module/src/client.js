"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const typeorm_1 = require("typeorm");
const _ = require("lodash");
const decorator_1 = require("./decorator");
let Client = class Client {
    async get() {
        try {
            let modules = appolo_1.Util.findAllReflectData(decorator_1.ModelKey, this.app.parent.exported);
            let entities = _.map(modules, module => module.fn);
            let config = _.defaults({}, this.moduleOptions.config, { synchronize: true, type: "postgres", entities });
            const client = await typeorm_1.createConnection(config);
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
    appolo_1.inject()
], Client.prototype, "logger", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], Client.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], Client.prototype, "app", void 0);
Client = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton(),
    appolo_1.factory()
], Client);
exports.Client = Client;
//# sourceMappingURL=client.js.map