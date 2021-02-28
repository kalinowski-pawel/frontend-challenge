import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Header } from './parts/Header/Header';
import { Footer } from './parts/Footer/Footer';
import { UsersList } from './components/UsersList/UsersList';
import { PagePagination } from './components/PagePagination/PagePagination';
import { FormDialog } from '../../components/FormDialog/FormDialog';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { fetch, update, updateUsersList, create, remove } from '../../models/Users';
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
  openConfirmDialog: boolean;
  error: string;
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
      openConfirmDialog: false,
      totalPages: 0,
      error: '',
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, () => {
      this.fetchUsers(0);
    });
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
          onEdit={this.onEditUser}
          onDelete={this.onDeleteUser}
        />
        {this.pagination}
      </>
    );
  }

  get overlay() {
    return this.state.isLoading ? <div className={styles.overlay}>
      <div className={styles.loading}><CircularProgress color='secondary' /></div>
    </div> : null;
  }

  get alert() {
    return this.state.error && <Alert severity='error'>
      <AlertTitle>Error</AlertTitle>
      Error occur: <strong>{this.state.error}</strong>
    </Alert>;
  }

  onAddUser = () => {
    this.setState({
      isEdit: false,
      isOpen: true,
    });
  };

  onEditUser = (user: User) => {
    this.setState({
      isEdit: true,
      isOpen: true,
      user,
    });
  };

  onDeleteUser = (user: User) => {
    this.setState({
      openConfirmDialog: true,
      user,
    });
  };

  onSaveUser = (user: User) => {
    this.setState({
      isLoading: true,
    });
    this.state.isEdit ? this.updateUser(user) : this.createUser(user);
  };

  onFormDialogClose = () => {
    this.setState({
      isOpen: false,
      user: undefined,
    });
  };

  onConfirmDialogClose = () => {
    this.setState({
      openConfirmDialog: false,
      user: undefined,
    });
  };

  fetchUsers = async (page?: number) => {
    try {
      const itemsList = await fetch(page);
      this.setState((prevState: State) => ({
        items: itemsList?.data.data,
        totalPages: itemsList.data.total_pages,
        isLoading: false,
      }));
    } catch (e) {
      this.setState({
        isLoading: false,
        error: e,
      });
    }
  };

  deleteUser = async (id: number) => {
    try {
      await remove(id);
      this.setState((prevState: State) => ({
        items: prevState.items.filter(el => (el.id !== id)),
        openConfirmDialog: false,
        isLoading: false,
        user: undefined,
      }));
    } catch (e) {
      this.setState({
        isLoading: false,
        error: e,
      });
    }
  };

  updateUser = async (user: User) => {
    try {
      const updatedUser = await update(user, user?.id);
      this.setState((prevState: State) => ({
        items: updateUsersList(prevState.items, updatedUser.data),
        isOpen: false,
        isLoading: false,
        user: undefined,
      }));
    } catch (e) {
      this.setState({
        isLoading: false,
        error: e,
      });
    }
  };

  createUser = async (user: User) => {
    try {
      const addedUser = await create(user);
      this.setState((prevState: State) => ({
        items: [addedUser.data, ...prevState.items],
        isOpen: false,
        isLoading: false,
        user: undefined,
      }));
    } catch (e) {
      this.setState({
        isLoading: false,
        error: e,
      });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        {this.alert}
        {!this.state.error && <Header addUser={this.onAddUser} />}
        {this.usersComponent}
        <Footer />
        {this.overlay}
        {this.state.openConfirmDialog && <ConfirmDialog
          handleDelete={this.deleteUser}
          onClose={this.onConfirmDialogClose}
          user={this.state.user}
          open={this.state.openConfirmDialog}
        />
        }
        {this.state.isOpen && <FormDialog
          onSave={this.onSaveUser}
          isEdit={this.state.isEdit}
          isOpen={this.state.isOpen}
          onClose={this.onFormDialogClose}
          user={this.state.user}
        />}
      </div>
    );
  }

}
