import React from "react";

import styles from 'Header.module.scss';

export class Header extends React.Component<any, any> {

    render() {
        return (
            <header className={styles.header}>This is simple header</header>
        )
    }
}