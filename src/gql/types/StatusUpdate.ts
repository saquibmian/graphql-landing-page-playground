import { Component } from "./Component";
import { StatusUpdateDAO } from "../../data/StatusUpdateDAO";
import { GQLType } from "../decorators/GQLType";

@GQLType
export class StatusUpdate {
    id: number;
    timestamp: Date;
    component: Component;
    severity: string;
    message: string;

    constructor(dao: StatusUpdateDAO, component: Component) {
        this.id = dao.id!;
        this.component = component;
        this.timestamp = new Date(dao.timestamp);
        this.severity = dao.severity;
        this.message = dao.message;
    }
}
