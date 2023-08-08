import { ResultWithDraw, SlotResultsDto } from "../../models/finalResult"
import { convertDateToCustomFormat } from "../../utils/applicationUtils";
import styles from './resultTable.module.scss';

export const ResultsTable = (props: ResultsTableProps) => {
    const { tableData } = props;
    let index = 0;

    const getResultNumber = (resultDraw: ResultWithDraw) => {
        const slotData = resultDraw;
        return <span className={styles.resultNumber}>{slotData ? slotData.ResultNumber.split('').join(' ') : '-'}</span>;
    }

    const getDrawNumber = (resultDraw: ResultWithDraw) => {
        const slotData = resultDraw;
        return <span className={styles.drawNumber}>{slotData ? 'Draw - ' + slotData.DrawNumber : ''}</span>;
    }

    return (
        <div className="table-responsive">
            <table className="text-black table table-striped table-bordered">
                {tableData && tableData.length > 0 ?
                    <><thead>
                        <tr>
                            <th style={{width: '10%'}}>Date</th>
                            <th>11:30 AM</th>
                            <th>01:30 PM</th>
                            <th>05:30 PM</th>
                            <th>07:30 PM</th>
                        </tr>
                    </thead>
                        <tbody>
                            {tableData.map(data => {
                                index += 1;
                                return (
                                    <tr key={index} className="text-black">
                                        <td style={{fontSize: 'x-small'}}>{convertDateToCustomFormat(new Date(data.ResultDate))}</td>
                                        <td>{getResultNumber(data.FirstSlotResult)}<br></br>{getDrawNumber(data.FirstSlotResult)}</td>
                                        <td>{getResultNumber(data.FourthSlotResult)}<br></br>{getDrawNumber(data.FourthSlotResult)}</td>
                                        <td>{getResultNumber(data.SecondSlotResult)}<br></br>{getDrawNumber(data.SecondSlotResult)}</td>
                                        <td>{getResultNumber(data.ThirdSlotResult)}<br></br>{getDrawNumber(data.ThirdSlotResult)}</td>                                        
                                    </tr>
                                )
                            })}
                        </tbody></> :
                    <tbody>
                        <tr className="text-black">
                            <td className="text-black">
                                <center>Record Not Found</center>
                            </td>
                        </tr>
                    </tbody>
                }
            </table>
        </div>
    )
}

interface ResultsTableProps {
    tableData: SlotResultsDto[]
}