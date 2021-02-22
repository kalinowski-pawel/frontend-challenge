import * as React from 'react';
import {getBooks} from "../../services/Books";
import {Header} from "./parts/Header/Header";
import {Footer} from "./parts/Footer/Footer";
import {SearchBox} from "./components/SearchBox/SearchBox";

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

    }

    //TODO move into middleware(?)
    getBooks = async(searchPhrase: string) => {
        const books = await getBooks(searchPhrase);

        this.setState({
            books: books
        })
    }


    onClick = (searchPhrase: string) => {
        this.getBooks(searchPhrase);
    }

    get header() {
        return <Header/>
    }

    get footer() {
        return <Footer/>
    }

    get searchBox(){
        return <SearchBox onClick={this.onClick}/>
    }

    render() {
        return (
            <React.Fragment>
                {this.header}
                {this.searchBox}
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