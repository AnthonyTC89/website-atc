import UserForm from '../../Components/UserForm';
import UserList from '../../Components/UserList';
import ImagesList from '../../Components/ImagesList';
import LogoForm from '../../Components/LogoForm';
import BannerForm from '../../Components/BannerForm';
import AboutForm from '../../Components/AboutForm';
import ContactForm from '../../Components/ContactForm';
import SocialNetworksList from '../../Components/SocialNetworksList';
import ProductsList from '../../Components/ProductsList';
import ServicesList from '../../Components/ServicesList';

const defaultDashboard = {
  Component: UserForm,
};

const collection = {
  UserForm,
  UserList,
  ImagesList,
  LogoForm,
  BannerForm,
  AboutForm,
  ContactForm,
  SocialNetworksList,
  ProductsList,
  ServicesList,
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
