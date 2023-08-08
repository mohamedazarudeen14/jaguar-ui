export interface TableData {
    columns: Columns[];
    rows: Rows[];
}

export interface Columns {
    label: string;
    field: string;
    width?: number;
    searchable: boolean;
}

export interface Rows {
    date: string;
    firstSlot: string;
    secondSlot: string;
    thirdSlot: string;
    fourthSlot: string;
}