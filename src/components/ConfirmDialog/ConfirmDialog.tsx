import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { User } from '../../types/Users';


interface Props {
  handleDelete: Function;
  onClose: Function;
  user?: User;
  open: boolean;
}

interface State {
  userId: number
}

export class ConfirmDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

  }

  handleSubmit = () => {
    if (this.props.user) {
      this.props.handleDelete(this.props.user.id);
    }
  };

  handleClose = () => this.props.onClose();

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Delete user
          </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            User <b>{this.props.user?.first_name} {this.props.user?.last_name}</b> will be removed, are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color='secondary' variant='contained' size='small'>
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color='primary' variant='contained' size='small' autoFocus>
            Delete user
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}
