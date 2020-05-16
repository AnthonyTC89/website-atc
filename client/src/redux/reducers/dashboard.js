import UserForm from '../../Components/UserForm';
import UserList from '../../Components/UserList';

const defaultDashboard = {
  Component: UserList,
};

const collection = {
  UserForm,
  UserList,
  // AcademicPeriods,
  // Courses,
  // Subjects,
  // CoursesShow,
  // SubjectsShow,
  // Schedule,
};

const dashboard = (state = defaultDashboard, { type, component }) => {
  switch (type) {
    case 'UPDATE_DASHBOARD':
      return {
        Component: collection[component],
      };
    default:
      return state;
  }
};

export default dashboard;
