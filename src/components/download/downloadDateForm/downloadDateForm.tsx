import styles from './downloadDateForm.module.scss';

export const DownloadDateForm = (props: DownloadDataFormProps) => {

    const onSearchButtonClick = () => {
        props.searchClick();
    }

    const onStartDateChange = (e: any) => {
        props.startDateChange(e.target.value);
    }

    const onEndDateChange = (e: any) => {
        props.endDateChange(e.target.value);
    }

    return (
        <div className="container">
            <div className='part-form'>
                <div className="pt-4 row d-flex align-self-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="check-box">
                            <label className={styles.title}>Start Date</label>
                            <div className="form-area">
                                <input type="date"
                                    className={`${styles.StartDate} form-control`}
                                    placeholder="MM/DD/YYYY" id="date1"
                                    onChange={onStartDateChange}
                                    value={props.startDateValue}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-md-0 mt-2 col-lg-4 col-md-6">
                        <div className="check-box">
                            <label className={styles.title}>End Date</label>
                            <div className="form-area">
                                <input type="date"
                                    className={`${styles.StartDate} form-control`}
                                    placeholder="MM/DD/YYYY" id="date2"
                                    onChange={onEndDateChange}
                                    value={props.endDateValue}                                   
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="d-block check-box mx-auto">
                            <h4 className={`text-black ${styles.title}`}> Click</h4>
                            <button className={styles.btnPok} id="btn_search" onClick={onSearchButtonClick}>
                                Search <i className={`${styles.iTag} ${styles.faSolid} fa-angles-right`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface DownloadDataFormProps {
    searchClick: Function;
    startDateChange: Function;
    endDateChange: Function;
    startDateValue: string;
    endDateValue: string;
}