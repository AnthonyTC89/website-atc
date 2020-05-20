import UserForm from '../../Components/UserForm';
import UserList from '../../Components/UserList';
import ImagesList from '../../Components/ImagesList';

const defaultDashboard = {
  Component: UserForm,
};

const collection = {
  UserForm,
  UserList,
  ImagesList,
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
