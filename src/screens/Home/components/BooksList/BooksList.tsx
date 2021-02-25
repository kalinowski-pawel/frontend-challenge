import * as React from 'react';
import { map } from 'lodash';
import { Book } from '../../../../types/Books'

interface Props {
  books: Book[] | any;
  getNextBooks: Function;
  startIndex?: number;
}

interface State {
  startIndex?: number;
}

export class BooksList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      startIndex: props.startIndex,
    }
  }

  get books() {
    return map(this.props.books, book =>
      (
        <div key={book.id}>
          <div>
            <span>Title: </span>
            <span>{book.volumeInfo?.title}</span>
          </div>
          <div>
            <span>Subtitle: </span>
            <span>{book.volumeInfo?.subtitle}</span>
          </div>
        </div>
      )
    );
  }

  render() {
    return (
      this.books

    )
  }

}
