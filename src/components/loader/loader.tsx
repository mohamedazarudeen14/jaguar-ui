import { SpinnerCircularFixed } from 'spinners-react'
import styles from './loader.module.scss'

export const Loader = (props: LoaderProps) => {
    return (
        <>
            {props.showSpinner &&
                <div className={styles.backgroundSpinner}>
                    <SpinnerCircularFixed className={styles.centerSpinner}
                        color='black' size={80}
                        thickness={100}>
                    </SpinnerCircularFixed>
                </div>
            }</>
    )
}

interface LoaderProps {
    showSpinner: boolean
}