import { IStatusUpdateDAO } from '../../data/StatusUpdateDAO';
import { GQLType } from '../decorators/GQLType';
import { Component } from './Component';

@GQLType
export class StatusUpdate {
    public id: number;
    public timestamp: Date;
    public component: Component;
    public severity: string;
    public message: string;

    constructor(dao: IStatusUpdateDAO, component: Component) {
        this.id = dao.id!;
        this.component = component;
        this.timestamp = new Date(dao.timestamp);
        this.severity = dao.severity;
        this.message = dao.message;
    }
}
