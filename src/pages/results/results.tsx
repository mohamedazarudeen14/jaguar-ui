import { useEffect, useState } from 'react';
import { Loader } from '../../components/loader/loader';
import { NumberResultTable } from '../../components/numberResultTable/numberResultTable';
import { ResultsTable } from '../../components/resultTable/resultTable';
import { FinalResults, Numbers, Slot, SlotResultsDto } from '../../models/finalResult';
import { getSlotResults } from '../../services/result.service';
import styles from './results.module.scss';

export const Results = () => {
    const backGround: CustomeStyle = { background: "orange", color: 'black'}
    const firstSlotLabelText = " 11.30 AM";
    const secondSlotLabelText = " 05:30 PM";
    const thirdSlotLabelText = " 07:30 PM";
    const baseBackground: CustomeStyle = {background: "linear-gradient(251.22deg, #0C244B 0%, #0B3846 99.53%)", color: "white"}

    const [resultState, setResultsState] = useState<ResultsState>({
        finalResult: null,
        todayResult: null,
        fourDigitNumbers: null,
        firstSlotButtonStyle: backGround,
        secondSlotButtonStyle: baseBackground,
        thirdSlotButtonStyle: baseBackground,
        resultLabel: firstSlotLabelText
    });

    useEffect(() => {
        getResults();
    }, [])

    const getResults = async () => {
        const currentDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 10);
        const finalResults = await getSlotResults(endDate, currentDate);
        const firstSlotResult = finalResults.ResultNumbers?.filter(obj => obj.Slot === Slot.FirstSlot);

        setResultsState({
            ...resultState,
            finalResult: finalResults,
            todayResult: firstSlotResult && firstSlotResult.length > 0 ?  firstSlotResult[0]: null,
            fourDigitNumbers: finalResults.SlotResultsDtos        
        });
    }

    const firstSlotButtonClick = () => {
        const firsSlotResult = resultState.finalResult.ResultNumbers?.filter(obj => obj.Slot === Slot.FirstSlot);

        setResultsState({
            ...resultState,
            firstSlotButtonStyle: backGround,
            secondSlotButtonStyle: baseBackground,
            thirdSlotButtonStyle: baseBackground,
            resultLabel: firstSlotLabelText,
            todayResult: firsSlotResult && firsSlotResult.length > 0 ? firsSlotResult[0] : null,
        });
    }

    const secondSlotButtonClick = () => {
        const secondSlotResult = resultState.finalResult.ResultNumbers?.filter(obj => obj.Slot === Slot.SecondSlot);

        setResultsState({
            ...resultState,
            firstSlotButtonStyle: baseBackground,
            secondSlotButtonStyle: backGround,
            thirdSlotButtonStyle: baseBackground,
            resultLabel: secondSlotLabelText,
            todayResult: secondSlotResult && secondSlotResult.length > 0 ? secondSlotResult[0] : null
        });
    }

    const thirdSlotButtonClick = () => {
        const thirdSlotResult = resultState.finalResult.ResultNumbers?.filter(obj => obj.Slot === Slot.ThirdSlot);

        setResultsState({
            ...resultState,
            firstSlotButtonStyle: baseBackground,
            secondSlotButtonStyle: baseBackground,
            thirdSlotButtonStyle: backGround,
            resultLabel: thirdSlotLabelText,
            todayResult: thirdSlotResult && thirdSlotResult.length > 0 ? thirdSlotResult[0] : null
        });
    }

    if (resultState.finalResult) {
        return (
            <div className={styles.mainDiv}>
                <div className={styles.breadcrumb}>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-xl-8 col-lg-6'>
                                <div className={styles.breadcrumbContent}>
                                    <span className={styles.subTitle}>
                                        Result
                                    </span>
                                    <h2 className={`mb-0 ${styles.title}`}>See Today Result</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.lotteries} pt-1`}>
                    <div className='container'>
                        <div>
                            <div className={styles.lotteriesSelectionMenu}></div>
                            <div className={styles.animated}>
                                <div className={styles.pickingNumberHeader}>
                                    <div>
                                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button style={resultState.firstSlotButtonStyle}
                                                    className={`${styles.navLink}`}
                                                    id="pills-numbers-tab" data-bs-toggle="pill"
                                                    data-bs-target="#pills-numbers" type="button"
                                                    role="tab" aria-controls="pills-numbers" aria-selected="false"
                                                    onClick={firstSlotButtonClick}>
                                                    <span className='font-weight-bold'>11.30 am</span>
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button style={resultState.secondSlotButtonStyle}
                                                    className={`${styles.navLink}`}
                                                    id="pills-winners-tab" data-bs-toggle="pill"
                                                    data-bs-target="#pills-winners" type="button"
                                                    role="tab" aria-controls="pills-winners" aria-selected="false"
                                                    onClick={secondSlotButtonClick}>
                                                    <span className='font-weight-bold'>05.30 pm</span>
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button style={resultState.thirdSlotButtonStyle}
                                                    className={`${styles.navLink}`}
                                                    id="pills-winners-tab" data-bs-toggle="pill"
                                                    data-bs-target="#pills-winners" type="button"
                                                    role="tab" aria-controls="pills-winners" aria-selected="false"
                                                    onClick={thirdSlotButtonClick}>
                                                    <span className='font-weight-bold'>07.30 pm</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={`${styles.tableBody} ${styles.pickingNumberBody} mt-2 mb-4 pt-0`}>
                                    <div className='tab-content' id='pills-tabContent'>
                                        <div className='tab-pane fade active show' id='pills-Numbers' role='tabpanel' aria-labelledby='pills-numbers-tab'>
                                            <h4 className='font-weight-bolder text-black py-4'>Prize Details -
                                                <span className='font-weight-bolder' style={{ color: "red" }}>{resultState.resultLabel}</span>
                                            </h4>
                                            <NumberResultTable data={resultState.todayResult}></NumberResultTable>
                                            <ResultsTable tableData={resultState.fourDigitNumbers}></ResultsTable>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <Loader showSpinner={true}></Loader>
        )
    }
}

interface ResultsState {
    finalResult: FinalResults;
    todayResult: Numbers;
    fourDigitNumbers: SlotResultsDto[];
    firstSlotButtonStyle: CustomeStyle;
    secondSlotButtonStyle: CustomeStyle;
    thirdSlotButtonStyle: CustomeStyle;
    resultLabel: string;
}


interface CustomeStyle {
    background?: string;
    color?: string;
}