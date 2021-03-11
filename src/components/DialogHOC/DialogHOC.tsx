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

interface State {
  user?: User,
}

export const dialogHOC: Function = <Props extends object>(Component: React.ComponentType<Props>) =>
  class WrapperDialog extends React.Component<Props & DialogProps, State> {
    private defaultUser = {
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
    };

    constructor(props: Props & DialogProps) {
      super(props);

      this.state = {
        user: this.props.user ?? this.defaultUser,
      };
    }


    handleClose = () => this.props.onClose();

    handleConfirm = () => this.props.onConfirm(this.state.user);

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
      const { action } = this.props;

      return action ? `${action.replace(/^./, action[0].toUpperCase())} user` : '';
    }

    render() {
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
              <Component {...props as Props} onChange={this.onChange} user={this.state.user}/>
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
