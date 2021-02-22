import React from 'react';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styles from './SearchBox.module.scss';

interface Props {
    onClick: Function;
}

interface State {
    phrase: string;
}

export class SearchBox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            phrase: ''
        }
    }

    onSubmit = (e: React.FormEvent<EventTarget>): void => {
        e.preventDefault();
        this.props.onClick(this.state.phrase)
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            phrase: e.target.value,
        })
    }

    render() {
        return (
            <Box className={styles.searchBox} p={2} m={2}>
                <form onSubmit={this.onSubmit} className={styles.form}>
                    <TextField
                        label="search your favorite book"
                        variant="standard"
                        name="phrase"
                        value={this.state.phrase}
                        onChange={this.onChange}
                    />
                    <Button
                        title="Search"
                        variant="outlined"
                        size="small"
                        type="submit"
                    >
                        Search
                    </Button>
                </form>
            </Box>
        );
    }


}