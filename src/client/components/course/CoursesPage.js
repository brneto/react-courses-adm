import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseThunks from '../../redux/thunks/courseThunks';
import CourseTable from './CourseTable';

const mapStateToProps = state => ({
  courses: state.get('courses').toJS()
});
// Same as:
// actions: course => dispatch(courseActions.createCourse(course))
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(courseThunks, dispatch)
});
// Same as:
// export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
@connect(mapStateToProps, mapDispatchToProps)
class CoursesPage extends Component {
  static propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { courses, actions } = this.props;

    return (
      <>
        <h1>Courses</h1>
        <button
          className="btn btn-primary"
          style={{ margin: '0.5em' }}
          onClick={() => actions.goToAddCourse()}
        >Add Course</button>
        <CourseTable
          data={courses}
          onDelete={course => actions.deleteCourse(course)}
        />
      </>
    );
  }
}

export default CoursesPage;
