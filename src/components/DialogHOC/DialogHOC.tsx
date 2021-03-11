import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface DialogProps {
  isLoading: boolean;
  title: string;
  isOpen: boolean;
  onClose: Function;
  onSubmit: Function;

}

const DialogHOC = <Props extends object>(Component: React.ComponentType<Props>) =>
  class DialogHOC extends React.Component<Props & DialogProps> {

    handleClose = () => this.props.onClose()

    handleSubmit = () => this.props.onSubmit();

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
                onClick={this.handleSubmit}
                color='primary'
                variant='contained'
                size='small'
                autoFocus
              >
                O
              </Button>
            </DialogActions>
        </Dialog>)
      )
    }
  }
