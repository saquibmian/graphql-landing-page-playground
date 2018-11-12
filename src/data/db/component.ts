import { BIGINT, Instance, Sequelize, STRING } from 'sequelize';
import * as sequelize from 'sequelize';
import { IComponentDAO } from '../ComponentDAO';

type ComponentType = Instance<IComponentDAO> & IComponentDAO;
export type ComponentModel = sequelize.Model<ComponentType, IComponentDAO>;

export function factory(sql: Sequelize): ComponentModel {
    return sql.define<ComponentType, IComponentDAO>('component', {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: STRING,
            allowNull: false,
            unique: true,
        },
    });
}
