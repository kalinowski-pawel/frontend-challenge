import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { User } from '../../types/Users';

export interface DialogProps {
  isLoading: boolean;
  isOpen: boolean;
  onClose: Function;
  onConfirm: Function;
  action: string;
  user?: User;

}

export const dialogHOC: Function = <Props extends object>(Component: React.ComponentType<Props>) =>
  class WrapperDialog extends React.Component<Props & DialogProps> {
    handleClose = () => {
      console.log('close');
      return this.props.onClose();
    };

    handleConfirm = () => {
      console.log('submit');
      return this.props.onConfirm(this.props.user);
    };

    get title() {
      const { action } = this.props;

      return action ? `${ action.replace(/^./, action[0].toUpperCase()) } user` : '';
    }

    render() {
      console.log('up');
      const { isOpen, isLoading, ...props } = this.props;
      return (
        isLoading ?
          (<div>...loading</div>)
          :
          (<Dialog
            open={isOpen}
            onClose={this.handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{this.title}</DialogTitle>
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
                Confirm
              </Button>
            </DialogActions>
          </Dialog>)
      );
    }
  };
