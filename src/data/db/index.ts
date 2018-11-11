import * as Sequelize from "sequelize";
import { factory as componentFactory, ComponentModel } from './component';
import { factory as statusUpdateFactory, StatusUpdateModel } from './status-update';

export interface DatabaseConfig {
    database: string;
    user: string;
    password: string;
    path: string;
}

export class Database {

    private readonly _sql: Sequelize.Sequelize;

    readonly components: ComponentModel;
    readonly statusUpdates: StatusUpdateModel;

    constructor(config: DatabaseConfig) {
        this._sql = new Sequelize(config.database, config.user, config.password, {
            dialect: 'sqlite',
            storage: config.path,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

        this.components = componentFactory(this._sql);
        this.statusUpdates = statusUpdateFactory(this._sql);
        this.statusUpdates.belongsTo(this.components);
    }

}

