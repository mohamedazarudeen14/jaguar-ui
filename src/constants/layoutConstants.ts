export interface LayoutConstants {
    home: string,
    results: string;
    downloadResults: string;
    addResultMessage: string;
    updateResult: string;
    deleteResult: string;
    addResultSuccessMessage: string;
    updationSuccessMessage: string;
    deleteSuccessMessage: string;
    deleteMessage: string;
    errorOccured: string;
    inputError: string;
    updateError: string;
    deleteError: string;
    success: string;
    failure: string;
    error: string;
    deleteInputError: string;
}

export const layoutConstants: LayoutConstants = {
    home: 'Home',
    results: 'Results',
    downloadResults: 'Download Results',
    addResultMessage: 'Do you want to proceed for adding result?',
    updateResult: 'Do you want to update?',
    deleteResult: 'Do you want to delete?',
    addResultSuccessMessage: 'Result Added Successfully',
    updationSuccessMessage: 'Updated Successfully',
    deleteSuccessMessage: 'Deleted Successfully',
    deleteMessage: 'Do you want to delete result?',
    errorOccured: 'Error occured, Try again',
    inputError: 'Add Proper Inputs',
    updateError: 'No date found to update',
    deleteError: 'No data found to delete',
    success: 'Success',
    failure: 'Failure',
    error: 'Error',
    deleteInputError: 'Select Slot To Delete'
}