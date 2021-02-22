import * as React from 'react';
import {getBooks} from "../../services/Books";
import {Header} from "./parts/Header/Header";
import {Footer} from "./parts/Footer/Footer";

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

    get header() {
        return <Header/>
    }

    get footer() {
        return <Footer/>
    }

    render() {
        return (
            <React.Fragment>
                {this.header}
                <div>
                    <label>Title: </label>
                    <span>{this.state.books?.data?.items[0]?.volumeInfo?.title}</span>
                </div>
                <div>
                    <label>Subtitle: </label>
                    <span>{this.state.books?.data?.items[0]?.volumeInfo?.subtitle}</span>
                </div>
                {this.footer}
            </React.Fragment>
        )
    }
}