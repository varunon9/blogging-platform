const BASE_URL = '/api';

const API_URLS = {
  GET_ARTICLES_DATA: BASE_URL + '/articles?filter[include]=customUser&filter[include][comments]=comments&filter[include][comments]=customUser',
  CREATE_ARTICLE_COMMENT: BASE_URL + '/articles/:articleId/comments',
  PATCH_COMMENT: BASE_URL + '/comments/:commentId',
  USERS_LOGIN: BASE_URL + '/users/login',
  GET_USER: BASE_URL + '/users/:userId',
  USERS: BASE_URL + '/users',
  ARTICLES: BASE_URL + '/articles',
  COMMENT_REPLIES: BASE_URL + '/comments/:commentId/?filter[include][comments]=customUser',
  CREATE_REPLY: BASE_URL + '/comments/:commentId/comments',
};

export const getArticles = () => {
  const url = API_URLS.ARTICLES;
  return new Promise((resolve, reject) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

export const loginUser = data => {
  const url = API_URLS.USERS_LOGIN;
  return new Promise((resolve, reject) => {
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

export const registerUser = data => {
  const url = API_URLS.USERS;
  return new Promise((resolve, reject) => {
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};