export interface StatusUpdateDAO {
    id?: number;
    timestamp: number;
    componentId: number;
    severity: string;
    message: string;
}