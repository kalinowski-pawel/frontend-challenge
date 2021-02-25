import * as React from 'react';
import { Header } from './parts/Header/Header';
import { Footer } from './parts/Footer/Footer';
import { BooksList } from './components/BooksList/BooksList';
import { SearchBox } from './components/SearchBox/SearchBox';
import { Pagination } from './components/Pagination/Pagination';
import { fetchBooks } from '../../models/Books';
import { Book } from '../../types/Books';


interface State {
  items: Book[] | [];
  isLoading: boolean;
  totalItems?: number;
  searchPhrase?: string;
  startIndex: number;
}

export class Home extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      startIndex: 0,
    };
  }

  onClick = async (searchPhrase: string) => {
    this.setState({
      isLoading: true,
      searchPhrase,
    }, () => this.fetchData(searchPhrase));
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

  get pagination() {
    return <Pagination totalItems={this.state.totalItems} startIndex={this.state.startIndex} />;
  }

  fetchData = async (searchPhrase: string, startIndex?: number) => {
    const itemsList = await fetchBooks(searchPhrase, startIndex);
    this.setState((prevState: State) => ({
      items: [...prevState.items, ...itemsList?.data?.items],
      totalItems: itemsList?.data?.totalItems,
      isLoading: false,
    }));
  };

  render() {
    const { isLoading, totalItems, items, startIndex } = this.state;
    return (
      <>
        {this.header}
        {this.searchBox}
        {this.pagination}
        {isLoading ?
          (<div>Searching books...</div>)
          :
          (
            <BooksList
              books={items}
              startIndex={startIndex}
              getNextBooks={this.fetchData}
            />)
        }
        {!isLoading && totalItems && (<div>Total items: {totalItems}</div>)}
        {this.footer}
      </>
    );
  }

}
