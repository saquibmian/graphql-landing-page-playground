import * as Logger from 'bunyan';
import { ComponentRepository } from '../data/ComponentRepository';
import { IPrincipal } from '../domain/IPrincipal';
import { Component } from '../gql/types/Component';

export class ComponentService {
    constructor(
        private readonly _log: Logger,
        private readonly _repository: ComponentRepository,
    ) { }

    public async getById(principal: IPrincipal, id: number): Promise<Component> {
        const found = await this._repository.getById(id);
        return new Component(found);
    }

    public async getByName(principal: IPrincipal, name: string): Promise<Component> {
        const found = await this._repository.getByName(name);
        return new Component(found);
    }

    public async getAll(principal: IPrincipal): Promise<Component[]> {
        const all = await this._repository.getAll();
        return all.map((item) => new Component(item));
    }

}
