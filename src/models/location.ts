import { Base, PagingModel } from "./base";

export interface Rack {
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

export interface RackData extends PagingModel {
    data: Rack[];
}