import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
  }
  getAuthors() {
    let data = this.props.getAuthorsQuery;
    return data.loading ? (
      <option disabled>Loading authors...</option>
    ) : (
      data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
  }

  submitForm(e) {
    e.preventDefault();
    let { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }
  render() {
    return (
      <div>
        <form id="add-book" onSubmit={this.submitForm.bind(this)}>
          <div className="field">
            <label>Book name:</label>
            <input
              type="text"
              onChange={e =>
                this.setState({
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input
              type="text"
              onChange={e =>
                this.setState({
                  genre: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            <label>Author:</label>
            <select
              onChange={e =>
                this.setState({
                  authorId: e.target.value,
                })
              }>
              <option>Select author</option>
              {this.getAuthors()}
            </select>
          </div>
          <button>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);