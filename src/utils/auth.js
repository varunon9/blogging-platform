const USER = 'user';

const isLoggedIn = () => {
  if (localStorage.getItem(USER)) {
    return true;
  }
  return false;
};

export {
  isLoggedIn
};