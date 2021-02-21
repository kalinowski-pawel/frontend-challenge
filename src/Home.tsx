import * as React from 'react';
import {getBooks} from "./Services/books";

interface Props {

}

interface State {
    books: any;
}

export class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            books: '',
        }
    }

    async componentDidMount() {
        const books = await getBooks();

        this.setState({
            books: books
        })
    }

    render() {
        return (<React.Fragment>
            <div>
                <label>Title: </label>
                <span>{this.state.books?.data?.items[0]?.volumeInfo?.title}</span>
            </div>
            <div>
                <label>Subtitle: </label>
                <span>{this.state.books?.data?.items[0]?.volumeInfo?.subtitle}</span>
            </div>
        </React.Fragment>)
    }
}