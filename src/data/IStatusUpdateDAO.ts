export interface IStatusUpdateDAO {
    id?: number;
    timestamp: number;
    componentId: number;
    severity: string;
    message: string;
}
