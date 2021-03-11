import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { User } from '../../types/Users';


interface Props {
  user?: User;
}

interface State {
  userId: number
}

export class RemoveUser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

  }

  render() {
    return (
      <div>
        <DialogContentText id='alert-dialog-description'>
          User <b>{this.props.user?.first_name} {this.props.user?.last_name}</b> will be removed, are you sure?
        </DialogContentText>
      </div>
    );
  }

}
