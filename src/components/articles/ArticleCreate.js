import React, { useState } from 'react';

import { navigateToScreen } from '../../App';
import { createArticle } from '../../actions/ApiClient';

const ArticleCreate = props => {
  const [articleData, setArticleData] = useState({
    title: '',
    content: ''
  });
  const [errrorMessage, setErrorMessage] = useState('');

  const onInputChange = key => {
    return event => {
      const value = event.target.value;
      const articleDataCopy = Object.assign({}, articleData);
      articleDataCopy[key] = value;
      setArticleData(articleDataCopy);
    };
  }

  const onCreateButtonClicked = e => {
    e.preventDefault();
    createArticle(articleData)
      .then(response => {
        navigateToScreen('/articles');
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="ui basic segment">
      <h1 className="ui header">Create an Article</h1>
      <form className="ui form">
        <div className="field">
          <label>Title</label>
          <input 
            placeholder="Title of your new article" 
            onChange={onInputChange('title')}
            value={articleData.title}
          />
        </div>
        <div className="field">
          <label>Content</label>
          <textarea 
            placeholder="Start typing content..." 
            onChange={onInputChange('content')}
            value={articleData.content}
          >
          </textarea>
        </div>
        <div className="field">
          {
            errrorMessage && <p className="error">{errrorMessage}</p>
          }
        </div>
        <button  className="ui button" onClick={onCreateButtonClicked}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ArticleCreate;