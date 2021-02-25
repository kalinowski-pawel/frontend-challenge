import * as React from 'react';
import { times } from 'lodash';

interface Props {
  totalItems?: number;
  startIndex: number;
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
      <ul>
        {this.props.totalItems && times(this.props.totalItems / 10, (item) => (
          <li>{item}</li>
        ))}
      </ul>

    );
  }

}
