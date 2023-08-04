import { Numbers } from '../../models/finalResult';
import { convertDateToCustomFormat } from '../../utils/applicationUtils';
import styles from './numberResultTable.module.scss';

export const NumberResultTable = (props: NumberResultTableProps) => {
    const { data } = props;
    const addLabelToResultNumbers = (number: string) => {
        return (
            <span className={`${styles.lot} mr-2`}>{number}</span>
        )
    }
    return (
        <div className='table-responsive'>
            <table className="table text-black bg-bluemix table-bordered">
                {data ?
                    <tbody>
                        <tr className='py-3'>
                            <th className='text-black pt-3 fw-bold py-2 bg-bluemix'>Date</th>
                            <td className={`${styles.dateLabel} py-3 lot-date fw-bold`}>{convertDateToCustomFormat(new Date(data.ResultDate))}</td>
                        </tr>
                        <tr className='text-black'>
                            <th className='text-black pt-3 bg-bluemix'>First Prize</th>
                            <td>
                                {addLabelToResultNumbers(data.FourDigit[0])}
                                {addLabelToResultNumbers(data.FourDigit[1])}
                                {addLabelToResultNumbers(data.FourDigit[2])}
                                {addLabelToResultNumbers(data.FourDigit[3])}
                            </td>
                        </tr>
                        <tr className='text-black'>
                            <th className='text-black pt-3 bg-bluemix'>Second Prize</th>
                            <td>
                                {addLabelToResultNumbers(data.ThreeDigit[0])}
                                {addLabelToResultNumbers(data.ThreeDigit[1])}
                                {addLabelToResultNumbers(data.ThreeDigit[2])}
                            </td>
                        </tr>
                        <tr className='text-black'>
                            <th className='text-black pt-3 bg-bluemix'>Third Prize</th>
                            <td>
                                {addLabelToResultNumbers(data.TwoDigit[0])}
                                {addLabelToResultNumbers(data.TwoDigit[1])}
                            </td>
                        </tr>
                        <tr className='text-black'>
                            <th className='text-black pt-3 bg-bluemix'>Fourth Prize</th>
                            <td>
                                {addLabelToResultNumbers(data.OneDigit)}
                            </td>
                        </tr>
                    </tbody>
                    :
                    <tbody>
                        <tr className="text-black">
                            <td className="text-black">
                                <center>Record Not Found</center>
                            </td>
                        </tr>
                    </tbody>}
            </table>
        </div>
    )
}

interface NumberResultTableProps {
    data: Numbers
}