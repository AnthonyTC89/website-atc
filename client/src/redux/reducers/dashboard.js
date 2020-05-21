import UserForm from '../../Components/UserForm';
import UserList from '../../Components/UserList';
import ImagesList from '../../Components/ImagesList';
import BannerForm from '../../Components/BannerForm';

const defaultDashboard = {
  Component: BannerForm,
};

const collection = {
  UserForm,
  UserList,
  ImagesList,
  BannerForm,
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
