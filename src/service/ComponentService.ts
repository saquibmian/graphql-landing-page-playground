import { Principal } from "../domain/Principal";
import { ComponentRepository } from "../data/ComponentRepository";
import { Component } from "../gql/types/Component";

export class ComponentService {
    constructor(
        private readonly _repository: ComponentRepository,
    ) { }

    async getById(principal: Principal, id: number): Promise<Component> {
        const found = await this._repository.getById(id);
        return new Component(found);
    }

    async getByName(principal: Principal, name: string): Promise<Component> {
        const found = await this._repository.getByName(name);
        return new Component(found);
    }

    async getAll(principal: Principal): Promise<Component[]> {
        const all = await this._repository.getAll();
        return all.map(item => new Component(item));
    }

}
