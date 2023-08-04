import { Result } from "../models/newResult"
import { convertDateToCustomFormat } from "../utils/applicationUtils"
import { baseAxios } from "./baseAxios.service"

export const addNewResult = async (date: string, slot: number, result: string) => {
    try {
        const newResult: Result = {
            date: new Date(date),
            slot: slot,
            resultNumber: result
        }

        const response = await baseAxios.post<boolean>(`api/v1/results/add-result`, newResult);
        return response.data;
    }
    catch (ex) {
        throw ex;
    }
}

export const updateExistingResult = async (date: string, slot: number, result: string) => {
    try {
        const newResult: Result = {
            date: new Date(date),
            slot: slot,
            resultNumber: result
        }

        const response = await baseAxios.put<boolean>(`api/v1/results/update-result`, newResult);
        return response.data;
    }
    catch(ex) {
        throw ex;
    }
}

export const deleteExistingResult = async (slot: number, selectedDate: string) => {
    try {
        const date = convertDateToCustomFormat(new Date(selectedDate));
        const response = await baseAxios.delete<boolean>(`api/v1/results/delete-data?slot=${slot}&selectedDate=${date}`);
        return response.data;
    }
    catch(ex) {
        throw ex;
    }
}

export const isResultAlreadyExist = async (slot: number, selectedDate: string) => {
    try {
        const date = convertDateToCustomFormat(new Date(selectedDate));
        const response = await baseAxios.get<boolean>(`api/v1/results/isResultExist?slot=${slot}&selectedDate=${date}`);
        return response.data;
    }
    catch (ex) {
        throw ex;
    }
}