const defaultData = null;

const data = (state = defaultData, { type, newData }) => {
  switch (type) {
    case 'UPDATE_DATA':
      return newData;
    default:
      return state;
  }
};

export default data;
