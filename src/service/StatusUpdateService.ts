import { Principal } from "../domain/Principal";
import { StatusUpdate } from "../gql/types/StatusUpdate";
import { StatusUpdateRepository } from "../data/StatusUpdateRepository";
import { Component } from "../gql/types/Component";
import { ComponentRepository } from "../data/ComponentRepository";
import { StatusUpdateDAO } from "../data/StatusUpdateDAO";

export class StatusUpdateService {

    constructor(
        private readonly _componentRepository: ComponentRepository,
        private readonly _repository: StatusUpdateRepository,
    ) {

    }
    async getAll(principal: Principal, component?: Component): Promise<StatusUpdate[]> {
        if (component != null) {
            const all = await this._repository.getAll(component.id);
            return await Promise.all(all.map(item => {
                return new StatusUpdate(item, component);
            }));
        }

        const all = await this._repository.getAll();
        return Promise.all(all.map(async item => {
            const component = await this._componentRepository.getById(item.componentId);
            return new StatusUpdate(item, new Component(component));
        }));
    }

    async create(principal: Principal, component: Component, severity: string, message: string): Promise<StatusUpdate> {
        const toCreate: StatusUpdateDAO = {
            timestamp: new Date().getTime(),
            componentId: component.id,
            message,
            severity
        };
        const created = await this._repository.create(toCreate);
        return new StatusUpdate(created, component);
    }

}