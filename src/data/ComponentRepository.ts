import * as Logger from 'bunyan';
import * as DataLoader from 'dataloader';
import sequelize = require('sequelize');
import { IComponentDAO } from './ComponentDAO';
import { ComponentModel } from './db/component';

export class ComponentRepository {

    private readonly _dataloader: DataLoader<number | string, IComponentDAO>;

    constructor(
        private readonly _log: Logger,
        private readonly _components: ComponentModel,
    ) {
        this._dataloader = new DataLoader((ids) => this.load(ids));
    }

    public async getById(id: number): Promise<IComponentDAO> {
        const found = await this._dataloader.load(id);
        return found;
    }

    public async getByName(name: string): Promise<IComponentDAO> {
        const found = await this._dataloader.load(name);
        return found;
    }

    public async getAll(): Promise<IComponentDAO[]> {
        const all = await this._components.findAll();
        return all;
    }

    private async load(toFetch: Array<number | string>): Promise<IComponentDAO[]> {
        const ids = toFetch.filter((i) => typeof i === 'number');
        const names = toFetch.filter((i) => typeof i === 'string');

        const fetched = await this._components.findAll({
            where: {
                [sequelize.Op.or]: [{
                    id: ids,
                }, {
                    name: names,
                }],
            },
        });

        return toFetch.map((i) => {
            const found = fetched.find((item) => item.id === i || item.name === i)!;
            if (found == null) {
                throw new Error(`There is no component with ID or name '${i}'.`);
            }
            return found;
        });
    }

}
