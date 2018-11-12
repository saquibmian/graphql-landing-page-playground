import { BIGINT, Instance, Sequelize, STRING } from 'sequelize';
import * as sequelize from 'sequelize';
import { IStatusUpdateDAO } from '../StatusUpdateDAO';

type StatusUpdateType = Instance<IStatusUpdateDAO> & IStatusUpdateDAO;
export type StatusUpdateModel = sequelize.Model<StatusUpdateType, IStatusUpdateDAO>;

export function factory(sql: Sequelize): StatusUpdateModel {
    return sql.define<StatusUpdateType, IStatusUpdateDAO>('status_update', {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true,
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
                key: 'id',
            },
            field: 'component_id',
        },
        severity: {
            type: STRING,
            allowNull: false,
            values: ['RED', 'YELLOW', 'GREEN'],
        },
        message: {
            type: STRING,
            allowNull: false,
        },
    });
}
