import * as React from 'react';
import { Header } from './parts/Header/Header';
import { Footer } from './parts/Footer/Footer';
import { SearchBox } from './components/SearchBox/SearchBox';
import {getBooksList} from "../../models/Books";

interface Props {}

interface State {
  books: any;
}

export class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      books: '',
    };
  }

  onClick = (searchPhrase: string) => {
    const booksList = getBooksList(searchPhrase);
    console.log({booksList})
    this.setState({
      books: getBooksList(searchPhrase),
    });
  };

  get header() {
    return <Header />;
  }

  get footer() {
    return <Footer />;
  }

  get searchBox() {
    return <SearchBox onClick={this.onClick} />;
  }

  render() {
    return (
      <>
        {this.header}
        {this.searchBox}
        <div>
          <span>Title: </span>
          <span>{this.state.books[0]?.volumeInfo?.title}</span>
        </div>
        <div>
          <span>Subtitle: </span>
          <span>{this.state.books[0]?.volumeInfo?.subtitle}</span>
        </div>
        {this.footer}
      </>
    );
  }
}
