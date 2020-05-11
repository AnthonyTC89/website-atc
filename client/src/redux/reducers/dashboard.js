// import Profile from '../../Components/Profile';
// import Users from '../../Components/Users';
// import AcademicPeriods from '../../Components/AcademicPeriods';
// import Courses from '../../Components/Courses';
// import Subjects from '../../Components/Subjects';
// import CoursesShow from '../../Components/CoursesShow';
// import SubjectsShow from '../../Components/SubjectsShow';
// import Schedule from '../../Components/Schedule';

const defaultDashboard = {
  // Component: Courses,
};

const collection = {
  // Profile,
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
