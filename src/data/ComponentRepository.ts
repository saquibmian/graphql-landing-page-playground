import { ComponentDAO } from "./ComponentDAO";
import { Database } from "./db";

export class ComponentRepository {

    constructor(
        private readonly _db: Database
    ) { }

    async getById(id: number): Promise<ComponentDAO> {
        const found = await this._db.components.findByPrimary(id);
        if (found == null) {
            throw new Error(`There is no component with ID '${id}'.`);
        }
        return found;
    }

    async getByName(name: string): Promise<ComponentDAO> {
        const found = await this._db.components.findOne({ where: { name } });
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