import { Instance, Sequelize, STRING, BIGINT } from "sequelize";
import * as sequelize from "sequelize";
import { ComponentDAO } from "../ComponentDAO";

type ComponentType = Instance<ComponentDAO> & ComponentDAO;
export type ComponentModel = sequelize.Model<ComponentType, ComponentDAO>;

export function factory(sql: Sequelize): ComponentModel {
    return sql.define<ComponentType, ComponentDAO>('component', {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING,
            allowNull: false,
            unique: true
        }
    });
};
