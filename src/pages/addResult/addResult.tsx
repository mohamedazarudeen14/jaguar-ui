import { useState } from 'react';
import styles from './addResult.module.scss';
import { convertDateWithHyphen } from '../../utils/applicationUtils';
import { Loader } from '../../components/loader/loader';
import { ModalPopup } from '../../components/common/modal/modalPopup';
import { layoutConstants } from '../../constants/layoutConstants';
import { addNewResult, deleteExistingResult, updateExistingResult } from '../../services/addResult.service';

export const AddResult = () => {
    const [addResultState, setAddResultState] = useState<AddResultState>({
        selectedDate: convertDateWithHyphen(new Date()),
        selectedSlot: 0,
        resultNumber: '',
        isLoading: false,
        showAddPopup: false,
        showUpdatePopup: false,
        showDeletePopup: false,
        showResultPopup: false,
        modalTitle: '',
        modalMessage: ''
    });

    const onDateChange = (e: any) => {
        setAddResultState({ ...addResultState, selectedDate: e.target.value });
    }

    const onSlotChange = (e: any) => {
        setAddResultState({ ...addResultState, selectedSlot: parseInt(e.target.value) });
    }

    const onResultNumberChange = (e: any) => {
        setAddResultState({ ...addResultState, resultNumber: e.target.value });
    }

    const showLoaderAndDisablePopup = () => {
        setAddResultState({
            ...addResultState, showAddPopup: false,
            showUpdatePopup: false,
            showDeletePopup: false,
            isLoading: true,
        })
    }

    const validateUserInputs = () => {
        const result = parseInt(addResultState.resultNumber);
        return addResultState.selectedSlot !== 0 && !isNaN(result) && addResultState.resultNumber.length === 4;
    }
   
    const showErrouPopup = (title: string, message: string) => {
        setAddResultState({
            ...addResultState, isLoading: false, showResultPopup: true,
            modalTitle: title,
            modalMessage: message
        })
    }

    const onAddButtonClick = () => {
        if (validateUserInputs()) {
            setAddResultState({ ...addResultState, showAddPopup: true });
        }
        else {
            showErrouPopup(layoutConstants.error, layoutConstants.inputError);
        }
    }

    const onConformationAddition = async () => {
        showLoaderAndDisablePopup();
        try {
            const response = await addNewResult(addResultState.selectedDate, addResultState.selectedSlot, addResultState.resultNumber);
            if (response) {
                setAddResultState({
                    ...addResultState, isLoading: false, showResultPopup: true,
                    modalTitle: layoutConstants.success,
                    modalMessage: layoutConstants.addResultSuccessMessage
                })
            }
            else {
                showErrouPopup(layoutConstants.failure, layoutConstants.errorOccured);
            }
        }
        catch {
            showErrouPopup(layoutConstants.failure, layoutConstants.errorOccured);
        }
    }

    const onUpdateButtonClick = () => {
        if (validateUserInputs()) {
            setAddResultState({ ...addResultState, showUpdatePopup: true });
        }
        else {
            showErrouPopup(layoutConstants.error, layoutConstants.inputError);
        }
    }

    const onConformationUpdation = async () => {
        showLoaderAndDisablePopup();
        try {
            const response = await updateExistingResult(addResultState.selectedDate, addResultState.selectedSlot, addResultState.resultNumber);
            if (response) {
                setAddResultState({
                    ...addResultState, isLoading: false, showResultPopup: true,
                    modalTitle: layoutConstants.success,
                    modalMessage: layoutConstants.updationSuccessMessage
                })
            }
            else {
                showErrouPopup(layoutConstants.error, layoutConstants.updateError);
            }
        }
        catch {
            showErrouPopup(layoutConstants.failure, layoutConstants.errorOccured);
        }
    }

    const onDeleteButtonClick = () => {
        if(addResultState.selectedSlot !== 0) {
            setAddResultState({ ...addResultState, showDeletePopup: true });
        }
        else {
            showErrouPopup(layoutConstants.error, layoutConstants.deleteInputError);
        }
    }

    const onConformationDeletion = async () => {
        showLoaderAndDisablePopup();
        try {
            const response = await deleteExistingResult(addResultState.selectedSlot, addResultState.selectedDate);
            if (response) {
                setAddResultState({
                    ...addResultState, isLoading: false, showResultPopup: true,
                    modalTitle: layoutConstants.success,
                    modalMessage: layoutConstants.deleteSuccessMessage
                })
            }
            else {
                showErrouPopup(layoutConstants.error, layoutConstants.deleteError);
            }
        }
        catch {
            showErrouPopup(layoutConstants.failure, layoutConstants.errorOccured);
        }
    }

    const onDisablePopup = () => {
        setAddResultState({
            ...addResultState, showAddPopup: false,
            showUpdatePopup: false,
            showDeletePopup: false,
            showResultPopup: false
        })
    }

    if (addResultState.isLoading) {
        return (
            <Loader showSpinner={addResultState.isLoading}></Loader>
        )
    }
    else {
        return (
            <div>
                <div className={`${styles.mainDiv} col-md-3 col-md-offset-4`}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="date">Select Date</label>
                            <input type="date"
                                className='form-control'
                                id="date2"
                                onChange={onDateChange}
                                value={addResultState.selectedDate}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="slot">Select Slot</label>
                            <select onChange={onSlotChange} className="form-control" value={addResultState.selectedSlot}>
                                <option value={0}>{""}</option>
                                <option value={1}>11:30 AM</option>
                                <option value={2}>05:30 PM</option>
                                <option value={3}>07:30 PM</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="resultNumber">Result Number</label>
                            <input type="text" maxLength={4} className="form-control"
                                id="resultNumber" placeholder="Result Number"
                                onChange={onResultNumberChange}
                                value={addResultState.resultNumber}
                            />
                        </div>
                    </form>
                    <div className='row'>
                        <button onClick={onAddButtonClick}
                            className="btn btn-primary rounded-pill col mr-3 mt-3">
                            Add
                        </button>
                        <button onClick={onUpdateButtonClick}
                            className="btn btn-primary rounded-pill col mr-3 mt-3">
                            Update
                        </button>
                        <button onClick={onDeleteButtonClick}
                            className="btn btn-primary rounded-pill col mr-3 mt-3">
                            Delete
                        </button>
                    </div>
                </div>
                {addResultState.showAddPopup &&
                    <ModalPopup modalTitle='Add Result'
                        modalBody={layoutConstants.addResultMessage}
                        addBButtonClick={onConformationAddition}
                        cancelButtonClick={onDisablePopup}
                    ></ModalPopup>
                }
                {addResultState.showUpdatePopup &&
                    <ModalPopup modalTitle='Update Result'
                        modalBody={layoutConstants.updateResult}
                        addBButtonClick={onConformationUpdation}
                        cancelButtonClick={onDisablePopup}
                    ></ModalPopup>
                }
                {addResultState.showDeletePopup &&
                    <ModalPopup modalTitle='Delete Result'
                        modalBody={layoutConstants.deleteMessage}
                        addBButtonClick={onConformationDeletion}
                        cancelButtonClick={onDisablePopup}
                    ></ModalPopup>
                }
                {addResultState.showResultPopup &&
                    <ModalPopup modalTitle={addResultState.modalTitle}
                        modalBody={addResultState.modalMessage}
                        isCancelButtonVisible={false}
                        addBButtonClick={onDisablePopup}
                    ></ModalPopup>
                }
            </div>
        )
    }
}

interface AddResultState {
    selectedDate: string;
    selectedSlot: number;
    resultNumber: string;
    isLoading: boolean;
    showAddPopup: boolean;
    showUpdatePopup: boolean;
    showDeletePopup: boolean;
    showResultPopup: boolean;
    modalTitle: string;
    modalMessage: string;
}