const defaultImages = [];

const images = (state = defaultImages, { type, data }) => {
  switch (type) {
    case 'UPDATE_IMAGES':
      return data;
    default:
      return state;
  }
};

export default images;
