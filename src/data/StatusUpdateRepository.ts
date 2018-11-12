import * as DataLoader from 'dataloader';
import * as _ from 'lodash';
import { Database } from './db';
import { IStatusUpdateDAO } from './StatusUpdateDAO';

export class StatusUpdateRepository {

    private readonly _dataloader: DataLoader<number, IStatusUpdateDAO[]>;

    constructor(
        private readonly _db: Database,
    ) {
        this._dataloader = new DataLoader((ids) => this.load(ids));
    }

    public async getAll(componentId?: number): Promise<IStatusUpdateDAO[]> {
        if (componentId == null) {
            const allForComponent = await this._db.statusUpdates.findAll({ order: [['timestamp', 'DESC']] });
            return allForComponent;
        }
        const all = await this._dataloader.load(componentId);
        return all;
    }

    public async create(item: IStatusUpdateDAO): Promise<IStatusUpdateDAO> {
        const created = this._db.statusUpdates.create(item);
        return created;
    }

    private async load(toFetch: number[]): Promise<IStatusUpdateDAO[][]> {
        const fetched = await this._db.statusUpdates.findAll({
            where: {
                componentId: toFetch,
            },
        });

        const groupedByComponentId = _.groupBy(fetched, (f) => f.componentId);
        return toFetch.map((i) => groupedByComponentId[i] || []);
    }

}
