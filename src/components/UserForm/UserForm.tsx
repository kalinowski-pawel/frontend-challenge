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
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

interface State {
  error?: Form,
}

export class UserForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: {
        first_name: !this.props.user?.first_name,
        last_name: !this.props.user?.last_name,
        email: !this.props.user?.email,
        avatar: !this.props.user?.avatar,
      },
    };
  }

  onClose = () => this.props.onClose();

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
          value={this.props.user?.first_name}
          onChange={this.props.onChange}
        />
        <TextField
          margin='dense'
          error={this.state.error?.last_name}
          id='last_name'
          label='Last name'
          type='text'
          fullWidth
          value={this.props.user?.last_name}
          onChange={this.props.onChange}
        />
        <TextField
          margin='dense'
          error={this.state.error?.email}
          id='email'
          label='Email Address'
          type='email'
          fullWidth
          value={this.props.user?.email}
          onChange={this.props.onChange}
        />
        <TextField
          margin='dense'
          error={this.state.error?.avatar}
          id='avatar'
          label='Avatar link'
          type='url'
          fullWidth
          value={this.props.user?.avatar}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
