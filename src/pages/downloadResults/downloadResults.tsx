import styles from './downloadResults.module.scss'

import { useState } from 'react'
import { DownloadDateForm } from '../../components/download/downloadDateForm/downloadDateForm'
import { DownloadHeader } from "../../components/download/downloadHeader/downloadHeader"
import { DownloadTable } from '../../components/download/downloadTable/downloadTable'
import { TableData } from '../../models/searchResult'
import { getSearchResults } from '../../services/result.service'
import { Loader } from '../../components/loader/loader'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { convertDateToCustomFormat } from '../../utils/applicationUtils'

export const DownloadResults = () => {
    const [downloadResultsState, setDownloadResultsState] = useState<DownloadResultsState>({
        tableData: null,
        startDate: '',
        endDate: '',
        showLoading: false,
        filteredTableData: null
    });

    const getResults = async () => {
        const searchResultsData = await getSearchResults(downloadResultsState.startDate, downloadResultsState.endDate);
        setDownloadResultsState({
            ...downloadResultsState, showLoading: false,
            tableData: searchResultsData,
            filteredTableData: searchResultsData,
        });
    }

    const onSearchClick = () => {
        if (!downloadResultsState.startDate) {
            alert("Select Start Date");
        }
        else if (!downloadResultsState.endDate) {
            alert('Select End Date');
        }
        else {
            setDownloadResultsState({ ...downloadResultsState, showLoading: true });
            getResults();
        }
    }

    const onStartDateChange = (selectedDate: string) => {
        setDownloadResultsState({ ...downloadResultsState, startDate: selectedDate });
    }

    const onEndDateChange = (selectedDate: string) => {
        setDownloadResultsState({ ...downloadResultsState, endDate: selectedDate });
    }

    const filterTableDataOnSearch = (searchString: string) => {
        const filterData = downloadResultsState.tableData.rows.filter(obj => obj.date.includes(searchString)
            || obj.firstSlot.includes(searchString) || obj.secondSlot.includes(searchString)
            || obj.thirdSlot.includes(searchString) || obj.fourthSlot.includes(searchString)
        );

        setDownloadResultsState({
            ...downloadResultsState,
            filteredTableData: { columns: downloadResultsState.filteredTableData.columns, rows: filterData }
        })
    }

    const downLoadPdf = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);
        const startDate = convertDateToCustomFormat(new Date(downloadResultsState.startDate));
        const endDate = convertDateToCustomFormat(new Date(downloadResultsState.endDate));

        const title = `BHUTAN JAGUAR 4D RESULT FROM ${startDate} TO ${endDate}`;
        const tableHeaders = downloadResultsState.filteredTableData.columns;
        const headers =  [
            tableHeaders[0].label,
            tableHeaders[1].label, 
            tableHeaders[2].label, 
            tableHeaders[3].label,
            tableHeaders[4].label
        ];

        const data = downloadResultsState.filteredTableData.rows.map(obj => [
            obj.date,
            obj.firstSlot,
            obj.fourthSlot,
            obj.secondSlot,
            obj.thirdSlot          
        ]);

        doc.text(title, marginLeft, 40);
        autoTable(doc, {
            head: [headers],
            body: data,
            margin: {top: 60}
        });

        doc.save("BhutanJaguar.pdf");
    }

    if (downloadResultsState.showLoading) {
        return (
            <Loader showSpinner={true}></Loader>
        )
    }
    else {
        return (
            <div className={styles.mainDiv}>
                <div className={`container`}>
                    <DownloadHeader></DownloadHeader>
                    <div className={styles.PartPickingNumber}>
                        <div className={styles.lotteriesSelectionMenu}></div>
                        <div className={`${styles.animated} animation-bod`}>
                            <div className={styles.pickingNumberBody}>
                                <div className="row">
                                    <div className="col well">
                                        <div>
                                            <DownloadDateForm searchClick={onSearchClick}
                                                startDateChange={onStartDateChange}
                                                endDateChange={onEndDateChange}
                                                startDateValue={downloadResultsState.startDate}
                                                endDateValue={downloadResultsState.endDate}
                                            ></DownloadDateForm>
                                        </div>
                                        <br></br>
                                        <DownloadTable
                                            onTableSearch={filterTableDataOnSearch}
                                            tableData={downloadResultsState.filteredTableData}
                                            onDownloadPdf={downLoadPdf}
                                        ></DownloadTable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

interface DownloadResultsState {
    tableData: TableData;
    startDate: string;
    endDate: string;
    showLoading: boolean;
    filteredTableData: TableData;
}