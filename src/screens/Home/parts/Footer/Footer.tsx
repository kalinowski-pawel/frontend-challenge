import React from "react";

import styles from './Footer.module.scss';

export class Footer extends React.Component<any, any> {

    render() {
        return (
            <footer className={styles.footer}>
                Used API <a href="https://reqres.in/">https://reqres.in/</a>
            </footer>
        )
    }
}
