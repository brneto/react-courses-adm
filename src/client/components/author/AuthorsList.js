import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthorListRow from './AuthorListRow';

class AuthorList extends Component {
  static propTypes = {
    authors: PropTypes.array.isRequired
  };

  render() {
    const { authors } = this.props;
    return (
      <table className="table table-striped mt-md-3">
        <caption>List of authors</caption>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>&nbsp;</th>
        </tr>
        </thead>
        <tbody>
          {authors.map(author =>
            <AuthorListRow key={author.value} author={author} />
          )}
        </tbody>
      </table>
    );
  }
}

export default AuthorList;
