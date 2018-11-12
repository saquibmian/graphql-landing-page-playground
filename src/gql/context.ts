import * as Logger from 'bunyan';
import { IPrincipal } from '../domain/IPrincipal';
import { ComponentService } from '../service/ComponentService';
import { StatusUpdateService } from '../service/StatusUpdateService';

export interface IGQLContext {
    logger: Logger;
    principal: IPrincipal;
    components: ComponentService;
    statusUpdates: StatusUpdateService;
}
