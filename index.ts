"use strict";
import {model} from "./module/src/decorator";
import {TypeOrmModule} from "./module/typeOrmModule";
import {ModelRepository} from "./module/src/modelRepository";
import {IOptions} from "./module/src/interfaces";
import {BaseCrudManager} from "./module/src/baseCrudManager";

export * from 'typeorm';

export {
    IOptions,
    ModelRepository,
    BaseCrudManager,
    model,
    TypeOrmModule
}
