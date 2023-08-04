import { ResultWithDraw, SlotResultsDto } from "../../models/finalResult"
import { convertDateToCustomFormat } from "../../utils/applicationUtils";

export const ResultsTable = (props: ResultsTableProps) => {
    const { tableData } = props;
    let index = 0;

    const getResultNumber = (resultDraw: ResultWithDraw) => {
        const slotData = resultDraw ? resultDraw : null;
        return slotData ? slotData.ResultNumber.split('').join(' ') : '-';
    }

    const getDrawNumber = (resultDraw: ResultWithDraw) => {
        const slotData = resultDraw ? resultDraw : null;
        return slotData ? '( Draw No - ' + slotData.DrawNumber + ' )' : '';
    }

    return (
        <div className="table-responsive">
            <table className="text-white table table-striped table-bordered">
                {tableData && tableData.length > 0 ?
                    <><thead>
                        <tr>
                            <th>Sno</th>
                            <th>Date</th>
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
                                        <td>{index}</td>
                                        <td>{convertDateToCustomFormat(new Date(data.ResultDate))}</td>
                                        <td>{getResultNumber(data.FirstSlotResult)}<br></br>{getDrawNumber(data.FirstSlotResult)}</td>
                                        <td>{getResultNumber(data.SecondSlotResult)}<br></br>{getDrawNumber(data.SecondSlotResult)}</td>
                                        <td>{getResultNumber(data.ThirdSlotResult)}<br></br>{getDrawNumber(data.ThirdSlotResult)}</td>
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