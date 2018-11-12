import { Request, Response, Application } from 'express';
import { Database } from '../data/db';

export function configureDevTools(app: Application) {
    app.get('/seed', (req: Request, res: Response) => {
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
                const response = {
                    message: 'seeded!',
                };
                res.json(response);
            });
    });
}
