import React from 'react';

const ArticleListItem = props => {
  const { article } = props;

  return (
    <div>
      <p>{`${article.id} - ${article.content}`}</p>
      <input />
    </div>
  );
};

export default ArticleListItem;
