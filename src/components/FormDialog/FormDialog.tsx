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
}

export class FormDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
    };

  }

  handleSave = () => this.props.onSave();

  handleClose = () => this.props.handleClose();

  get title() {
    return this.props.isEdit ? 'Edit user' : 'Create user';
  }

  render() {

    return (
      <div>
        <Dialog open={this.props.isOpen} onClose={this.handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>{this.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button onClick={this.handleSave} color='primary'>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
