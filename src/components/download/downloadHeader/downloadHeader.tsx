import styles from './downloadHeader.module.scss';

export const DownloadHeader = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
                <div className={styles.sectionTitle}>
                    <div className={styles.subTitle}></div>
                    <div className={styles.title}></div>
                </div>
            </div>
        </div>
    )
}