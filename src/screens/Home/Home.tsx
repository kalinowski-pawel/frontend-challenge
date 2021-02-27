import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header } from './parts/Header/Header';
import { Footer } from './parts/Footer/Footer';
import { UsersList } from './components/UsersList/UsersList';
import { SearchBox } from './components/SearchBox/SearchBox';
import { PagePagination } from './components/PagePagination/PagePagination';
import { FormDialog } from '../../components/FormDialog/FormDialog';
import { fetch, update } from '../../models/Users';
import { User } from '../../types/Users';

import styles from './Home.module.scss';

interface State {
  items: User[] | [];
  isLoading: boolean;
  totalPages: number;
  searchPhrase?: string;
  page?: number;
  isEdit: boolean;
  isOpen: boolean;
  user?: User;
}

export class Home extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      page: 0,
      isEdit: false,
      isOpen: false,
      totalPages: 0,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    }, () => {
      this.fetchUsers(0);
    })
  }

  onClick = async (searchPhrase: string) => {
    this.setState({
      isLoading: true,
      searchPhrase,
    }, () => {
    }); // TODO filter users
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
    return (!this.state.isLoading && this.state.totalPages) ?
      <PagePagination handlePagination={this.fetchUsers} totalPages={this.state.totalPages} />
      : null;
  }

  get usersComponent() {
    return (
      <>
        <UsersList
          users={this.state.items}
          page={this.state.page}
          getUsers={this.fetchUsers}
          onDelete={this.onDeleteUser}
          onEdit={this.onEditUser}
        />
        {this.pagination}
      </>
    );
  }


  fetchUsers = async (page?: number) => {
    const itemsList = await fetch(page);
    this.setState((prevState: State) => ({
      items: itemsList?.data.data,
      totalPages: itemsList.data.total_pages,
      isLoading: false,
    }));
  };

  onSaveUser = async (user: User) => {
    console.log('save user');
    const itemsList = await update(user, user?.id);
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
      <div className={styles.container}>
        {this.header}
        {this.state.isLoading ? <div className={styles.loading}><CircularProgress color='secondary' /></div> : this.usersComponent}
        {this.footer}
        {this.state.isOpen && <FormDialog
          onSave={this.onSaveUser}
          isEdit={this.state.isEdit}
          isOpen={this.state.isOpen}
          handleClose={this.handleDialogClose}
          user={this.state.user}
        />}
      </div>
    );
  }

}
