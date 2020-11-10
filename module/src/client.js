"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const typeorm_1 = require("typeorm");
const _ = require("lodash");
const decorator_1 = require("./decorator");
let Client = class Client {
    async get() {
        try {
            let modules = Util.findAllReflectData(decorator_1.ModelKey, this.app.parent.exported);
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
    inject_1.inject()
], Client.prototype, "logger", void 0);
tslib_1.__decorate([
    inject_1.inject()
], Client.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    inject_1.inject()
], Client.prototype, "app", void 0);
Client = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    inject_1.factory()
], Client);
exports.Client = Client;
//# sourceMappingURL=client.js.map