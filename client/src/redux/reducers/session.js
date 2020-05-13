const defaultSession = {
  user: null,
  isLoggedIn: false,
};

const session = (state = defaultSession, { type, user }) => {
  switch (type) {
    case 'UPDATE_SESSION':
      if (user === null) {
        return defaultSession;
      }
      return { user, isLoggedIn: true };
    default:
      return state;
  }
};

export default session;
