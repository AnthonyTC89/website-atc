import UserForm from '../../Components/UserForm';

const defaultDashboard = {
  Component: UserForm,
};

const collection = {
  UserForm,
  // Users,
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
