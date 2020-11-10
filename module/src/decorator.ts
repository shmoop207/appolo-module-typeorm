import "reflect-metadata";
import {EntitySchema, ObjectType} from "typeorm";
import {Classes, Reflector} from '@appolo/utils';


export const ModelKey = Symbol("model");
export const InjectModelKey = Symbol("injectModel");


export function model(name?: string| ObjectType<any> | EntitySchema<any>) {

    return function (fn: any, propertyKey?: string, descriptor?: PropertyDescriptor) {

        if (propertyKey) {
            return injectModel(name as ObjectType<any> | EntitySchema<any>)(fn, propertyKey, descriptor)
        }

         name = Classes.className(fn) + "Model";

        Reflect.defineMetadata(ModelKey, name, fn);
    }
}

 function injectModel(model: ObjectType<any> | EntitySchema<any>) {

    return function (fn: any, propertyKey: string, descriptor?: PropertyDescriptor) {

        let models = Reflector.getFnMetadata(InjectModelKey, fn.constructor, []);

        models.push({fn, propertyKey, model})

    }
}
