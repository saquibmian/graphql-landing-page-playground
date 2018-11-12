import * as Sequelize from 'sequelize';
import { ComponentModel, factory as componentFactory } from './component';
import { factory as statusUpdateFactory, StatusUpdateModel } from './status-update';
import { rootLogger } from '../../logging';

export interface IDatabaseConfig {
    database: string;
    user: string;
    password: string;
    path: string;
}

export class Database {

    public readonly components: ComponentModel;
    public readonly statusUpdates: StatusUpdateModel;

    private readonly _log = rootLogger;
    private readonly _sql: Sequelize.Sequelize;

    constructor(config: IDatabaseConfig) {
        this._sql = new Sequelize(config.database, config.user, config.password, {
            dialect: 'sqlite',
            storage: config.path,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            logging: (msg: string) => this._log.trace(msg),
        });

        this.components = componentFactory(this._sql);
        this.statusUpdates = statusUpdateFactory(this._sql);
        this.statusUpdates.belongsTo(this.components);
    }

}
