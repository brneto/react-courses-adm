import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authorThunks from '../../redux/thunks/authorThunks';
import { authorByIdSelector } from '../../redux/selectors/authorSelectors';
import AuthorForm from './AuthorForm';

const mapStateToProps = state => {
  const author = authorByIdSelector(state);
  const saving = state.get('ajaxCallsInProgress') > 0;
  return { author, saving };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authorThunks, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ManageAuthorPage extends Component {
  static propTypes = {
    author: PropTypes.object.isRequired,
    saving: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    author: this.props.author,
    error: {},
  };

  componentWillReceiveProps = nextProps => {
    const { author: oldAuthor } = this.props;
    const { author } = nextProps;

    if(oldAuthor.id !== author.id)
      this.setState({ author });
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { author } = this.state;

    author[name] = value;
    this.setState({ author });
  };

  handleSubmit = event => {
    const { actions } = this.props;

    if(this.courseFormIsValid()) {
      actions.saveAuthor(this.state.author);
    }

    event.preventDefault();
    event.stopPropagation();
  };

  courseFormIsValid = () => {
    const { author } = this.state;
    let formIsValid = true;
    let error = {};

    if(author.firstName.length < 5) {
      error.firstName = 'Firstname must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ error });
    return formIsValid;
  };

  render = () => (
    <AuthorForm
      onChange={this.handleChange}
      onSubmit={this.handleSubmit}
      onBlur={this.handleBlur}
      author={this.state.author}
      saving={this.props.saving}
      error={this.state.error}
    />
  );
}

export default ManageAuthorPage;
