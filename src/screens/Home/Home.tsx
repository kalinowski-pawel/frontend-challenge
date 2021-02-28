import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, () => {
      this.fetchUsers(0);
    });
  }

  onClick = async (searchPhrase: string) => {
    this.setState({
      isLoading: true,
      searchPhrase,
    }, () => {
    }); // TODO filter users
  };

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

  get overlay(){
    return this.state.isLoading ?<div className={styles.overlay}><div className={styles.loading}><CircularProgress color='secondary' /></div></div> : null;
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
      user
    })
  }

  fetchUsers = async (page?: number) => {
    const itemsList = await fetch(page);
    this.setState((prevState: State) => ({
      items: itemsList?.data.data,
      totalPages: itemsList.data.total_pages,
      isLoading: false,
    }));
  };

  onSaveUser = (user: User) => {
    this.setState({
      isLoading: true,
    });
    this.state.isEdit ? this.updateUser(user) : this.createUser(user);
  };

  deleteUser = async (id: number) => {
    try {
      await remove(id);
      this.setState((prevState: State) => ({
        items: prevState.items.filter(el => (el.id !== id)),
        openConfirmDialog: false,
        isLoading: false,
        user: undefined
      }));
    } catch (e) {
      console.log(e);
    }
  };

  // TODO check name convention for handle vs on functions
  updateUser = async (user: User) => {
    try {
      const updatedUser = await update(user, user?.id);
      this.setState((prevState: State) => ({
        items: updateUsersList(prevState.items, updatedUser.data),
        isOpen: false,
        isLoading: false,
        user: undefined
      }));
    } catch (e) {
      console.log(e);
    }
  };

  createUser = async (user: User) => {
    try {
      const addedUser = await create(user);
      this.setState((prevState: State) => ({
        items: [addedUser.data, ...prevState.items],
        isOpen: false,
        isLoading: false,
        user: undefined
      }));
    } catch (e) {
      console.log(e);
    }
  };

  onFormDialogClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  onConfirmDialogClose = () => {
    this.setState({
      openConfirmDialog: false,
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <Header addUser={this.onAddUser}/>
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
