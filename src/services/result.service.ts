import { FinalResults, SortType } from "../models/finalResult";
import { convertDateToCustomFormat, mapSearchData } from "../utils/applicationUtils";
import { baseAxios } from "./baseAxios.service";

export const getSlotResults = async (fromDate: Date, toDate: Date) => {
    try {
        const date1 = convertDateToCustomFormat(fromDate);
        const date2 = convertDateToCustomFormat(toDate);

        const results = await baseAxios.get<FinalResults>(`api/v1/results/get-results?fromDate=${date1}&toDate=${date2}&sortType=${SortType.Descending}`);
        return results.data
    }
    catch(ex) {
        console.log(ex);
        throw ex;
    }
}

export const getSearchResults = async (fromDate: string, toDate: string) => {
    try {
        const date1 = convertDateToCustomFormat(new Date(fromDate));
        const date2 = convertDateToCustomFormat(new Date(toDate));

        const results = await baseAxios.get<FinalResults>(`api/v1/results/get-results?fromDate=${date1}&toDate=${date2}&sortType=${SortType.Ascending}`);
        return mapSearchData(results.data)
    }
    catch(ex) {
        console.log(ex);
        throw ex;
    }
}