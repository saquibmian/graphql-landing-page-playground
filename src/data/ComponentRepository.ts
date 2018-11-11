import { ComponentDAO } from "./ComponentDAO";
import { Database } from "./db";
import * as DataLoader from 'dataloader';
import sequelize = require("sequelize");


export class ComponentRepository {

    private readonly _dataloader: DataLoader<number | string, ComponentDAO>;

    constructor(
        private readonly _db: Database
    ) {
        this._dataloader = new DataLoader(
            (ids: (number | string)[]) => ComponentRepository.load(this._db, ids)
        );
    }

    private static async load(db: Database, toFetch: (number | string)[]): Promise<ComponentDAO[]> {
        const ids = toFetch.filter(i => typeof i === 'number');
        const names = toFetch.filter(i => typeof i === 'string');

        const fetched = await db.components.findAll({
            where: {
                [sequelize.Op.or]: [{
                    id: ids
                }, {
                    name: names
                }]
            }
        });
        if (fetched.length != toFetch.length) {
            throw new Error(`Expected ${toFetch.length} items, got ${fetched.length}!`);
        }

        return toFetch.map(i => fetched.find(item => item.id === i || item.name === i)!);
    }

    async getById(id: number): Promise<ComponentDAO> {
        const found = await this._dataloader.load(id);
        if (found == null) {
            throw new Error(`There is no component with ID '${id}'.`);
        }
        return found;
    }

    async getByName(name: string): Promise<ComponentDAO> {
        const found = await this._dataloader.load(name);
        if (found == null) {
            throw new Error(`There is no component named '${name}'.`);
        }
        return found;
    }

    async getAll(): Promise<ComponentDAO[]> {
        const all = await this._db.components.findAll();
        return all;
    }

}