import { FinalResults } from "../models/finalResult";
import { Columns, Rows, TableData } from "../models/searchResult";

export const convertDateToCustomFormat = (date: Date) => {
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
}

export const convertDateWithHyphen = (date: Date) => {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

export const mapSearchData = (finalResult: FinalResults) => {
    const tabeleData: TableData = {
        columns: getColumns(),
        rows: getRows(finalResult),
    }

    return tabeleData;
}

const getRows = (finalResult: FinalResults) => {
    const rows: Rows[] = [];

    finalResult.SlotResultsDtos.forEach(obj => {
        const row: Rows = {
            date: convertDateToCustomFormat(new Date(obj.ResultDate)),
            firstSlot: obj.FirstSlotResult ? (obj.FirstSlotResult.ResultNumber + ' Draw - ' + obj.FirstSlotResult.DrawNumber) : '-',
            secondSlot: obj.SecondSlotResult ? (obj.SecondSlotResult.ResultNumber + ' Draw - ' + obj.SecondSlotResult.DrawNumber) : '-',
            thirdSlot: obj.ThirdSlotResult ? (obj.ThirdSlotResult.ResultNumber + ' Draw - ' + obj.ThirdSlotResult.DrawNumber) : '-',
        }
        rows.push(row);
    })


    return rows;
}

const getColumns = () => {
    const columns: Columns[] = [
        {
            label: 'Date',
            field: 'date',
            searchable: true,
        },
        {
            label: '11:30 AM',
            field: 'firstSlot',
            searchable: true,
        },
        {
            label: '05:30 PM',
            field: 'secondSlot',
            searchable: true
        },
        {
            label: '07:30 PM',
            field: 'thirdSlot',
            searchable: true
        }
    ]

    return columns;
}