import { Instance, Sequelize, STRING, BIGINT } from "sequelize";
import * as sequelize from "sequelize";
import { StatusUpdateDAO } from "../StatusUpdateDAO";

type StatusUpdateType = Instance<StatusUpdateDAO> & StatusUpdateDAO;
export type StatusUpdateModel = sequelize.Model<StatusUpdateType, StatusUpdateDAO>;

export function factory(sql: Sequelize): StatusUpdateModel {
    return sql.define<StatusUpdateType, StatusUpdateDAO>('status_update', {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        timestamp: {
            type: BIGINT,
            allowNull: false,
        },
        componentId: {
            type: BIGINT,
            allowNull: false,
            references: {
                model: 'components',
                key: 'id'
            },
            field: 'component_id'
        },
        severity: {
            type: STRING,
            allowNull: false,
            values: ['RED', 'YELLOW', 'GREEN']
        },
        message: {
            type: STRING,
            allowNull: false
        },
    });
};
