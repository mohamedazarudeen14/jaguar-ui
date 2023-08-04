import { ResultWithDraw, SlotResultsDto } from "../../models/finalResult"
import { convertDateToCustomFormat } from "../../utils/applicationUtils";

export const ResultsTable = (props: ResultsTableProps) => {
    const { tableData } = props;
    let index = 0;

    const getResultNumber = (resultDraw: ResultWithDraw) => {
        const slotData = resultDraw;
        return slotData ? slotData.ResultNumber.split('').join(' ') : '-';
    }

    const getDrawNumber = (resultDraw: ResultWithDraw) => {
        const slotData = resultDraw;
        return slotData ? 'Draw - ' + slotData.DrawNumber : '';
    }

    return (
        <div className="table-responsive">
            <table className="text-white table table-striped table-bordered">
                {tableData && tableData.length > 0 ?
                    <><thead>
                        <tr>
                            <th style={{width: '10%'}}>Date</th>
                            <th>11:30 AM</th>
                            <th>05:30 PM</th>
                            <th>07:30 PM</th>
                        </tr>
                    </thead>
                        <tbody>
                            {tableData.map(data => {
                                index += 1;
                                return (
                                    <tr key={index} className="text-white">
                                        <td style={{fontSize: 'x-small'}}>{convertDateToCustomFormat(new Date(data.ResultDate))}</td>
                                        <td>{getResultNumber(data.FirstSlotResult)}<br></br><span style={{fontSize: 'smaller'}}>{getDrawNumber(data.FirstSlotResult)}</span></td>
                                        <td>{getResultNumber(data.SecondSlotResult)}<br></br><span style={{fontSize: 'smaller'}}>{getDrawNumber(data.SecondSlotResult)}</span></td>
                                        <td>{getResultNumber(data.ThirdSlotResult)}<br></br><span style={{fontSize: 'smaller'}}>{getDrawNumber(data.ThirdSlotResult)}</span></td>
                                    </tr>
                                )
                            })}
                        </tbody></> :
                    <tbody>
                        <tr className="text-white">
                            <td className="text-white">
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