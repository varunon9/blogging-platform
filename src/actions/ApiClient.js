import axios from 'axios';

import { getAuthHeaderConfig } from '../utils/auth';

const BASE_URL = 'http://localhost:3001/api';

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
  GET_ARTICLE_DATA: BASE_URL + '/articles/:articleId/?filter[include]=customUser&filter[include][comments]=comments&filter[include][comments]=customUser',
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

export const getUser = loginData => {
  let url = API_URLS.GET_USER.replace(':userId', loginData.userId);
  url += `?access_token=${loginData.id}`;
  return axios.get(url);
};

export const getArticles = () => {
  const url = API_URLS.GET_ARTICLES_DATA;
  return new Promise((resolve, reject) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

export const getArticle = articleId => {
  let url = API_URLS.GET_ARTICLE_DATA.replace(':articleId', articleId);
  return axios.get(url);
};

export const getCommentReplies = commentId => {
  const url = API_URLS.COMMENT_REPLIES.replace(':commentId', commentId);
  return axios.get(url);
};

export const createArticle = data => {
  const url = API_URLS.ARTICLES;
  return axios.post(url, data, getAuthHeaderConfig());
};

export const createReply = (commentId, data) => {
  const url = API_URLS.CREATE_REPLY.replace(':commentId', commentId);
  return axios.post(url, data, getAuthHeaderConfig());
};