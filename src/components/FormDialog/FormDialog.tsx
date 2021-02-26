import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { User } from '../../types/Users';

interface Props {
  user?: User;
  onSave: Function;
  handleClose: Function;
  isEdit: boolean;
  isOpen: boolean;
}

interface State {
  open: boolean;
  user?: User
}

export class FormDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
      user: this.props.user,
    };
  }

  handleSave = () => this.props.onSave(this.state.user);

  handleClose = () => this.props.handleClose();

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value }: { id: string; value: string } = e.target;

    this.setState((prevState: State) => ({
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
        <Dialog open={this.props.isOpen} onClose={this.handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>{this.title}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
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
              id='last_name'
              label='Last name'
              type='text'
              fullWidth
              value={this.state.user?.last_name}
              onChange={this.onChange}
            />
            <TextField
              margin='dense'
              id='email'
              label='Email Address'
              type='email'
              fullWidth
              value={this.state.user?.email}
              onChange={this.onChange}
            />
            <TextField
              margin='dense'
              id='avatar'
              label='Avatar link'
              type='url'
              fullWidth
              value={this.state.user?.avatar}
              onChange={this.onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button onClick={this.handleSave} color='primary'>
              Save user
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
