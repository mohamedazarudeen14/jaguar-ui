import { MDBDataTable } from 'mdbreact';
import { TableData } from '../../../models/searchResult';

export const DownloadTable = (props: DownloadTableProps) => {
    const onSearch = (e: any) => {
        props.onTableSearch(e.target.value);
    }

    const downloadPdf = () => {
        if (props.tableData && props.tableData.rows.length > 0) {
            props.onDownloadPdf();
        }
        else {
            alert('No Data Found To Download');
        }
    }

    return (
        props.tableData &&
        <div className="container">
            <div>
                <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div className="dt-buttons btn-group flex-wrap">
                        <button className="btn btn-secondary buttons-pdf buttons-html5 mb-4"
                            aria-controls="example"
                            type="button" onClick={downloadPdf}>
                            <span>PDF</span>
                        </button>
                    </div>
                    <div className="form-outline w-50 mb-2">
                        <label className='form-label font-weight-bold'>Search</label>
                        <input type="text" id="input3" className="form-control" onChange={e => onSearch(e)} />
                    </div>
                    <div style={{ width: "95%" }}>
                        <MDBDataTable
                            striped
                            bordered
                            data={props.tableData}
                            noRecordsFoundLabel={"No Record Found"}
                            noBottomColumns={true}
                            responsive={true}
                            responsiveSm={true}
                            responsiveMd={true}
                            responsiveLg={true}
                            responsiveXl={true}
                            scrollX={false}
                            fixed={true}
                            displayEntries={false}
                            barReverse={true}
                            entries={10}
                            searching={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

interface DownloadTableProps {
    tableData: TableData;
    onTableSearch: Function;
    onDownloadPdf: Function;
}