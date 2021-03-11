import React from 'react';
import Button from '@material-ui/core/Button';
import { ACTIONS } from '../../../../common/constants/constants';

import styles from './Header.module.scss';

interface Props {
  addUser: Function,
}

export class Header extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <header className={styles.header}>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={() => this.props.addUser(ACTIONS.ADD)}
        >
          Add user
        </Button>
      </header>
    );
  }
}
