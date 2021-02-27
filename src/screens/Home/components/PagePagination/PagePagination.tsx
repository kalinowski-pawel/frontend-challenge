import * as React from 'react';
import Pagination from '@material-ui/lab/Pagination';

import styles from './PagePagination.module.scss';

interface Props {
  totalPages: number;
  handlePagination: Function;
}

export class PagePagination extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
  }

  handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    this.props.handlePagination(value);
  };

  render() {
    return (
      <div className={styles.container}>
        <Pagination
          onChange={this.handlePagination}
          count={this.props.totalPages}
        />
      </div>
    );
  }

}
