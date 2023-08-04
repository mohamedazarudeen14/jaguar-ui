import styles from './modalPopup.module.scss';

export const ModalPopup = (props: ModalPopupProps) => {
    const { isCancelButtonVisible = true } = props;

    const onOkButtonClick = () => {
        props.addBButtonClick();
    }

    const onCancelButtonClick = () => {
        props.cancelButtonClick();
    }

    return (
        <div className={`${styles.modalVisible}`} tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.modalTitle}</h5>
                        <button onClick={onCancelButtonClick} type="button"
                            className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{props.modalBody}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onOkButtonClick} className="btn btn-primary">Ok</button>
                        {isCancelButtonVisible && <button onClick={onCancelButtonClick} type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ModalPopupProps {
    modalTitle: string;
    modalBody: string;
    addBButtonClick: Function;
    cancelButtonClick?: Function;
    isCancelButtonVisible?: boolean
}