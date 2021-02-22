import React from "react";

import styles from './Footer.module.scss';

export class Footer extends React.Component<any, any> {

    render() {
        return (
            <header className={styles.footer}>This is simple footer</header>
        )
    }
}