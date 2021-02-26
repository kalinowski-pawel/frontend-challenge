import * as React from 'react';
import { Header } from './parts/Header/Header';
import { Footer } from './parts/Footer/Footer';
import { BooksList } from './components/BooksList/BooksList';
import { UsersList } from './components/UsersList/UsersList';
import { SearchBox } from './components/SearchBox/SearchBox';
import { Pagination } from './components/Pagination/Pagination';
import { FormDialog } from '../../components/FormDialog/FormDialog';
import { fetchBooks } from '../../models/Books';
import { fetch } from '../../models/Users';
import { Book } from '../../types/Books';
import { User } from '../../types/Users';


interface State {
  items: Book[] | User[] | [];
  isLoading: boolean;
  totalItems?: number;
  searchPhrase?: string;
  startIndex?: number;
  apiType: Type;
  isEdit: boolean;
  isOpen: boolean;
  user?: User;
}

enum Type {
  Books,
  Users
}

const API_TYPE = {
  BOOKS: 0,
  USERS: 1,
};

export class Home extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      startIndex: 0,
      apiType: 1,
      isEdit: false,
      isOpen: false,
    };
  }

  async componentDidMount() {
    if (this.state.apiType === API_TYPE.USERS) {
      this.fetchUsers(0);
    }
  }

  onClick = async (searchPhrase: string) => {
    this.setState({
      isLoading: true,
      searchPhrase,
    }, () => this.fetchBooks(searchPhrase));
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

  get booksComponent() {
    return (
      <>
        {this.searchBox}
        {this.pagination}
        {this.state.isLoading ?
          (<div>Searching books...</div>)
          :
          (
            <BooksList
              books={this.state.items}
              startIndex={this.state.startIndex}
              getNextBooks={this.fetchBooks}
            />)
        }
        {!this.state.isLoading && this.state.totalItems && (<div>Total items: {this.state.totalItems}</div>)}
      </>
    );
  }

  get usersComponent() {
    return (
      <>
        {this.state.isLoading ?
          (<div>Loading users...</div>)
          :
          (
            <UsersList
              users={this.state.items}
              page={this.state.startIndex}
              getUsers={this.fetchUsers}
              onDelete={this.onDeleteUser}
              onEdit={this.onEditUser}
            />)
        }
        {!this.state.isLoading && this.state.totalItems && (<div>Total items: {this.state.totalItems}</div>)}
      </>
    );
  }

  fetchBooks = async (searchPhrase: string, startIndex?: number) => {
    const itemsList = await fetchBooks(searchPhrase, startIndex);
    this.setState((prevState: State) => ({
      items: [...prevState.items, ...itemsList?.data?.items],
      totalItems: itemsList?.data?.totalItems,
      isLoading: false,
    }));
  };

  fetchUsers = async (page: number) => {
    const itemsList = await fetch(page);
    this.setState({
      items: itemsList?.data.data,
      totalItems: itemsList?.data.total,
      isLoading: false,
    });
  };

  onSaveUser = async (id?: number) => {
    console.log('save user', id);
    return null;
  };

  onDeleteUser = (id: number) => {
    console.log('delete user', id);
    return null;
  };

  // TODO check name convention for handle vs on functions
  onEditUser = (user: User) => {
    console.log('on edit');
    this.setState({
      isEdit: true,
      isOpen: true,
      user,
    });
  };

  onAddUser = () => {
    this.setState({
      isEdit: false,
      isOpen: true,
    });
  };

  handleDialogClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    return (
      <>
        {this.header}
        {this.state.apiType === API_TYPE.BOOKS ? this.booksComponent : this.usersComponent}
        {this.footer}
        {this.state.isOpen && <FormDialog
          onSave={this.onSaveUser}
          isEdit={this.state.isEdit}
          isOpen={this.state.isOpen}
          handleClose={this.handleDialogClose}
          user={this.state.user}
        />}
      </>
    );
  }

}
