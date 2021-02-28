import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { isValid } from '../../common/Validators';

import { User } from '../../types/Users';

type Form = {
  first_name?: boolean,
  last_name?: boolean,
  email?: boolean,
  avatar?: boolean,
}

interface Props {
  user?: User;
  onSave: Function;
  onClose: Function;
  isEdit: boolean;
  isOpen: boolean;
}

interface State {
  open: boolean;
  user?: User,
  error?: Form,
}

export class FormDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
      user: this.props.user,
      error: {
        first_name: !this.props.user?.first_name,
        last_name: !this.props.user?.last_name,
        email: !this.props.user?.email,
        avatar: !this.props.user?.avatar,
      }
    };
  }

  handleSave = () => this.props.onSave(this.state.user);

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
        <Dialog open={this.props.isOpen} onClose={this.onClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>{this.title}</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClose} color='secondary' variant='contained' size='small'>
              Cancel
            </Button>
            <Button onClick={this.handleSave} color='primary' variant='contained' size='small'>
              Save user
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
