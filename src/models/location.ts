export interface Rack {
    forEach(arg0: (location: any) => void): unknown;
    id: number;
    name: string;
    rowCount: number;
    columnCount: number;
    racks: Array<{
        id: number;
        column: number;
        row: number;
        size: number;
        areaId: number;
    }>;
}