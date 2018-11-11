import { ComponentDAO } from "./ComponentDAO";
import { Database } from "./db";
import * as DataLoader from 'dataloader';
import sequelize = require("sequelize");


export class ComponentRepository {

    private readonly _dataloader: DataLoader<number | string, ComponentDAO>;

    constructor(
        private readonly _db: Database,
    ) {
        this._dataloader = new DataLoader(ids => this.load(ids));
    }

    private async load(toFetch: (number | string)[]): Promise<ComponentDAO[]> {
        const ids = toFetch.filter(i => typeof i === 'number');
        const names = toFetch.filter(i => typeof i === 'string');

        const fetched = await this._db.components.findAll({
            where: {
                [sequelize.Op.or]: [{
                    id: ids
                }, {
                    name: names
                }]
            }
        });

        return toFetch.map(i => {
            const found = fetched.find(item => item.id === i || item.name === i)!
            if (found == null) {
                throw new Error(`There is no component with ID or name '${i}'.`);
            }
            return found;
        });
    }

    async getById(id: number): Promise<ComponentDAO> {
        const found = await this._dataloader.load(id);
        return found;
    }

    async getByName(name: string): Promise<ComponentDAO> {
        const found = await this._dataloader.load(name);
        return found;
    }

    async getAll(): Promise<ComponentDAO[]> {
        const all = await this._db.components.findAll();
        return all;
    }

}