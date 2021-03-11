import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { User } from '../../types/Users';

export interface DialogProps {
  isLoading: boolean;
  title: string;
  isOpen: boolean;
  onClose: Function;
  onConfirm: Function;
  user?: User;

}

export const dialogHOC: Function = <Props extends object>(Component: React.ComponentType<Props>) =>
  class DialogHOC extends React.Component<Props & DialogProps> {
    handleClose = () => {
      console.log('close');
      return this.props.onClose()
    }

    handleConfirm = () => {
      console.log('submit');
      return this.props.onConfirm(this.props.user);
    }

    render() {
      const {isOpen, isLoading, title, ...props } = this.props;
      return(
        isLoading ?
          (<div>...loading</div>)
            :
          (<Dialog
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            <Component {...props as Props} />
          </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                color='secondary'
                variant='contained'
                size='small'
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleConfirm}
                color='primary'
                variant='contained'
                size='small'
                autoFocus
              >
                Ok
              </Button>
            </DialogActions>
        </Dialog>)
      )
    }
  }
