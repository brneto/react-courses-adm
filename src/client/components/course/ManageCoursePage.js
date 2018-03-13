import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as courseThunks from '../../redux/thunks/courseThunks';
import { courseByIdSelector } from '../../redux/selectors/courseSelectors';
import { authorsFormattedSelector } from '../../redux/selectors/authorSelectors';
import CourseForm from './CourseForm';

const mapStateToProps = state => {
  const course = courseByIdSelector(state);
  const authors = authorsFormattedSelector(state);
  const saving = state.get('ajaxCallsInProgress') > 0;
  return { course, authors, saving };
};

const mapDispatchToProps = dispatch => ({
  // Similar to:
  // { saveCourse: course => dispatch(courseThunks.saveCourse(course)) }
  actions: bindActionCreators(courseThunks, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ManageCoursesPage extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    saving: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    course: this.props.course,
    error: {},
  };

  // This is required because when props change,
  // we'll need to update our container component's state.
  componentWillReceiveProps = nextProps => {
    const { course: oldCourse } = this.props;
    const { course } = nextProps;

    if(oldCourse.id !== course.id) {
      this.setState({ course });
    }
  };

  handleChange = event => {
    const { target: { name: field, value } } = event;
    const { course } = this.state;

    course[field] = value;
    this.setState({ course });
  };

  handleSubmit = event => {
    const { actions } = this.props;

    if(this.courseFormIsValid()) {
      actions.saveCourse(this.state.course);
    }

    event.preventDefault();
    event.stopPropagation();
  };

  courseFormIsValid = () => {
    let formIsValid = true;
    let errors = {};

    if(this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  };

  render= () => (
    <CourseForm
      allAuthors = {this.props.authors}
      onChange={this.handleChange}
      onSubmit={this.handleSubmit}
      course={this.state.course}
      saving={this.props.saving}
      error={this.state.error}
    />
  );
}

export default ManageCoursesPage;
