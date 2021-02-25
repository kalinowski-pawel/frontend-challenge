import * as React from 'react';
import { map } from 'lodash';
import { User } from '../../../../types/Users'

interface Props {
  users: User[] | any;
  getUsers: Function;
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
    }
  }

  get users() {
    return map(this.props.users, user =>
      (
        <div key={user.id}>
          <div>
            <span>Name: </span>
            <span>{user.first_name}</span>
          </div>
          <div>
            <span>Surname: </span>
            <span>{user.last_name}</span>
          </div>
        </div>
      )
    );
  }

  render() {
    return (
      this.users

    )
  }

}
