import { Request, Response } from 'express';
import { Database } from '../data/db';

export function seedDatabase(req: Request, res: Response) {
    const db: Database = res.locals.db;
    Promise.resolve(true)
        .then(() => db.components.drop())
        .then(() => db.statusUpdates.drop())
        .then(() => db.components.sync())
        .then(() => db.statusUpdates.sync())
        .then(() => db.components.upsert({ name: 'first' }))
        .then(() => db.components.upsert({ name: 'second' }))
        .then(() => db.components.upsert({ name: 'third' }))
        .then(() => {
            res.locals.logger.info('rebuilt and seeded database');
            const response = {
                message: 'seeded!',
            };
            res.json(response);
        });
}
