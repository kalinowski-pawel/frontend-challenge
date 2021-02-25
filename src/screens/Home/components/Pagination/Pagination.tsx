import * as React from 'react';
import { times } from 'lodash';

import styles from './Pagination.module.scss';

interface Props {
  totalItems?: number;
  startIndex?: number;
}

export class Pagination extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.state = {
      startIndex: props.startIndex,
    };
  }

  render() {
    return (
      <ul className={styles.pagination}>
        {this.props.totalItems && times(this.props.totalItems / 10, (item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

    );
  }

}
