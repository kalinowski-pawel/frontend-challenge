import React from 'react';
import TextField from '@material-ui/core/TextField';
import { isValid } from '../../common/Validators';
import { DialogProps } from '../DialogHOC/DialogHOC';

import { User } from '../../types/Users';

type Form = {
  first_name?: boolean,
  last_name?: boolean,
  email?: boolean,
  avatar?: boolean,
}

interface Props extends DialogProps {
  user?: User;
  onConfirm: Function;
  onClose: Function;
  isEdit: boolean;
}

interface State {
  user?: User,
  error?: Form,
}

export class UserForm extends React.Component<Props, State> {
  private defaultUser = {
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      user: this.props.user ?? this.defaultUser,
      error: {
        first_name: !this.props.user?.first_name,
        last_name: !this.props.user?.last_name,
        email: !this.props.user?.email,
        avatar: !this.props.user?.avatar,
      },
    };
    console.log('user form');
  }

  handleSave = () => this.props.onConfirm(this.state.user);

  onClose = () => this.props.onClose();

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value }: { id: string; value: string } = e.target;
    this.setState((prevState: State) => ({
        error: {
          [id]: !isValid(value, id),
        } as Pick<Form, keyof Form>,
        user: {
          ...prevState.user,
          [id]: value,
        } as Pick<User, keyof User>,
      }
    ));
  };

  get title() {
    return this.props.isEdit ? 'Edit user' : 'Create user';
  }

  render() {
    return (
      <div>
        <TextField
          autoFocus
          error={this.state.error?.first_name}
          margin='dense'
          id='first_name'
          label='First name'
          type='text'
          fullWidth
          value={this.state.user?.first_name}
          onChange={this.onChange}
        />
        <TextField
          margin='dense'
          error={this.state.error?.last_name}
          id='last_name'
          label='Last name'
          type='text'
          fullWidth
          value={this.state.user?.last_name}
          onChange={this.onChange}
        />
        <TextField
          margin='dense'
          error={this.state.error?.email}
          id='email'
          label='Email Address'
          type='email'
          fullWidth
          value={this.state.user?.email}
          onChange={this.onChange}
        />
        <TextField
          margin='dense'
          error={this.state.error?.avatar}
          id='avatar'
          label='Avatar link'
          type='url'
          fullWidth
          value={this.state.user?.avatar}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
