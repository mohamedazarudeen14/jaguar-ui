import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { applicationUrls } from "../../constants/applicationUrls";
import { layoutConstants } from "../../constants/layoutConstants";
import styles from './layout.module.scss';
import jaguarImage from '../../assets/jaguar_logo.png';

export const Layout = (props: LayoutProps) => {
    const [layoutState, SetLayoutState] = useState<LayoutState>({
        currentUrl: '',
        customeStyles: { height: "75px" },
        expandMenu: false
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        highlightSelectedMenu();
    }, [location.pathname])

    const highlightSelectedMenu = () => {
        SetLayoutState({ ...layoutState, currentUrl: location.pathname })
    }

    const displayMenuLink = (menuUrl: string, menuName: string) => {
        return (
            <Link className={`${layoutState.currentUrl.includes(menuUrl) ? styles.tabActive : styles.tabInActive} nav-link`} to={menuUrl}>
                {menuName}
            </Link>
        )
    }

    const headerTagClick = () => {
        navigate(applicationUrls.results);
    }

    const onMenuButtonClick = () => {
        const style: CustomeStyle = { height: layoutState.customeStyles.height === "200px" ? "75px" : "200px" };
        SetLayoutState({ ...layoutState, customeStyles: style });
    }

    if (props.isAddPage) {
        return (
            <div>
                <div id="mainDiv" style={layoutState.customeStyles} className={`${styles.header} fixed-top`}>
                    <nav className="navbar navbar-expand-lg navbar-dark pink scrolling-navbar">
                        <div className="row text-white ml-3" role="button">
                            <span>
                                <strong>BHUTAN <br></br>JAGUAR 4D</strong>
                            </span>
                            <span className="ml-2">
                                <img alt="logo" className={`${styles.logoImg} rounded`} src={jaguarImage}></img>
                            </span>
                        </div>
                    </nav>
                </div>
                {props.children}
            </div>
        )
    }
    else {
        return (
            <div>
                <div id="mainDiv" style={layoutState.customeStyles} className={`${styles.header} fixed-top`}>
                    <nav className="navbar navbar-expand-lg navbar-dark pink scrolling-navbar">
                        <div className="row text-white ml-3" role="button" onClick={headerTagClick}>
                            <span>
                                <strong>BHUTAN <br></br>JAGUAR 4D</strong>
                            </span>
                            <span className="ml-2">
                                <img alt="logo" className={`${styles.logoImg} rounded`} src={jaguarImage}></img>
                            </span>
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" onClick={onMenuButtonClick} aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item mr-5">
                                    {displayMenuLink(applicationUrls.results, layoutConstants.results)}
                                </li>
                                <li className="nav-item mr-5">
                                    {displayMenuLink(applicationUrls.downloadResults, layoutConstants.downloadResults)}
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                {props.children}
            </div>
        )
    }
}

interface LayoutProps {
    children?: ReactNode;
    isAddPage?: boolean;
}

interface LayoutState {
    currentUrl: string;
    customeStyles: CustomeStyle;
    expandMenu: boolean;
}

interface CustomeStyle {
    height: string
}