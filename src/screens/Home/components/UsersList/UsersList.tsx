import * as React from 'react';
import { map } from 'lodash';
import List from '@material-ui/core/List';
import { UserItem } from './Components/UserItem/UserItem';

import { User } from '../../../../types/Users';

interface Props {
  users: User[];
  getUsers: Function;
  onDelete: Function;
  onEdit: Function;
  page?: number;
}

interface State {
  page?: number;
}

export class UsersList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      page: props.page,
    };
  }

  get users() {
    return map(this.props.users, user => (
      <UserItem
        key={user.id}
        user={user}
        onEdit={this.props.onEdit}
        onDelete={this.props.onDelete}
      />
      ));
  }

  render() {
    return (
      <List>
        {this.users}
      </List>

    );
  }

}
