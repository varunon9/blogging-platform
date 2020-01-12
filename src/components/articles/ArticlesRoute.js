import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ArticlesMain from './ArticlesMain';
import Article from './Article';
import ArticleCreate from './ArticleCreate';

function ArticlesRoute(props) {
  const matchedPath = props.match.path;
  return (
    <Switch>
      <Route exact path={matchedPath} component={ArticlesMain} />
      <Route exact path={`${matchedPath}/create`} component={ArticleCreate} />
      <Route exact path={`${matchedPath}/:id`} component={Article} />
    </Switch>
  );
}

export default ArticlesRoute;