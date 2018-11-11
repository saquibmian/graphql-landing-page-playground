import { Principal } from "../domain/Principal";
import { ComponentService } from "../service/ComponentService";
import { StatusUpdateService } from "../service/StatusUpdateService";

export interface Context {
    principal: Principal;
    components: ComponentService;
    statusUpdates: StatusUpdateService;
}