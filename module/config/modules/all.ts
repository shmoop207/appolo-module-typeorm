import {App} from '@appolo/core';

import {LoggerModule} from '@appolo/logger';


export = async function (app: App) {

    if(!app.injector.hasDefinition("logger")){
        await app.module.load(LoggerModule)
    }

}
