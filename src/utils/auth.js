import customLocalStorage from './customLocalStorage';

const USER = 'user';

export const isLoggedIn = () => {
  if (localStorage.getItem(USER)) {
    return true;
  }
  return false;
};

export const getAuthHeaderConfig = () => {
  const user = customLocalStorage.getItem(USER);
  const config = {
    headers: {
      Authorization: ''
    }
  };
  if (user) {
    config.headers.Authorization = `${user.loginData.id}`
  }
  return config;
};