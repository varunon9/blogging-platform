import React from 'react';

import '../css/Articles.css';
import { getArticles } from '../actions/ApiClient';

class Articles extends React.Component {
  componentDidMount() {
    getArticles()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <>
        Articles
      </>
    );
  }
}

export default Articles;