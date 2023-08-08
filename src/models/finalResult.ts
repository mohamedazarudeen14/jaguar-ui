export interface SlotResultsDto {
    ResultDate: Date;
    FirstSlotResult: ResultWithDraw;
    SecondSlotResult: ResultWithDraw;
    ThirdSlotResult: ResultWithDraw;
    FourthSlotResult: ResultWithDraw;
}

export interface ResultWithDraw {
    DrawNumber: string;
    ResultNumber: string;
}

export enum Slot {
    FirstSlot = 1,
    SecondSlot = 2,
    ThirdSlot = 3,
    FourthSlot = 4,
}

export enum SortType {
    Ascending = 1,
    Descending = 2
}

export interface Numbers {
    Slot: Slot;
    ResultDate: Date;
    FourDigit: string;
    ThreeDigit: string;
    TwoDigit: string;
    OneDigit: string;
}

export interface FinalResults {
    SlotResultsDtos: SlotResultsDto[];
    ResultNumbers: Numbers[];
}