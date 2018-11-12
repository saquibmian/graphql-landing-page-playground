import * as Logger from 'bunyan';
import { ComponentRepository } from '../data/ComponentRepository';
import { IStatusUpdateDAO } from '../data/StatusUpdateDAO';
import { StatusUpdateRepository } from '../data/StatusUpdateRepository';
import { IPrincipal } from '../domain/Principal';
import { Component } from '../gql/types/Component';
import { StatusUpdate } from '../gql/types/StatusUpdate';

export class StatusUpdateService {

    constructor(
        private readonly _log: Logger,
        private readonly _componentRepository: ComponentRepository,
        private readonly _repository: StatusUpdateRepository,
    ) {

    }
    public async getAll(principal: IPrincipal, component?: Component): Promise<StatusUpdate[]> {
        if (component != null) {
            const allForComponent = await this._repository.getAll(component.id);
            return await Promise.all(allForComponent.map((item) => {
                return new StatusUpdate(item, component);
            }));
        }

        const all = await this._repository.getAll();
        return Promise.all(all.map(async (item) => {
            const loadedComponent = await this._componentRepository.getById(item.componentId);
            return new StatusUpdate(item, new Component(loadedComponent));
        }));
    }

    public async create(
        principal: IPrincipal,
        component: Component,
        severity: string,
        message: string,
    ): Promise<StatusUpdate> {
        const toCreate: IStatusUpdateDAO = {
            timestamp: new Date().getTime(),
            componentId: component.id,
            message,
            severity,
        };
        const created = await this._repository.create(toCreate);
        return new StatusUpdate(created, component);
    }

}
