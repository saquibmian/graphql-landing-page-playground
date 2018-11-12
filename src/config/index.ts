export const config = {
    pg: {
        path: process.env.DB_FILE || '',
        database: process.env.DB_DATABASE || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
    },
};
