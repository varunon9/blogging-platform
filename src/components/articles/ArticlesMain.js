import React from 'react';
import { Link } from 'react-router-dom';

import ArticleListItem from './ArticleListItem';
import '../../css/ArticlesMain.css';
import { getArticles } from '../../actions/ApiClient';
import customLocalStorage from '../../utils/customLocalStorage';

class ArticlesMain extends React.Component {

  constructor(props) {
    super(props);
    this.user = customLocalStorage.getItem('user');
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    getArticles()
      .then(response => this.setState({
        articles: response
      }))
      .catch(error => console.log(error));
  }

  render() {
    const user = this.user;
    const articles = this.state.articles;

    return (
      <div className="ui segment basic">
        <div className="ui equal width grid">
          <div className=" column">
            Hello { user ? user.name : 'Guest'}
          </div>
          <div className="column">
            <div className="ui secondary menu">
              <div className="right menu">
                {
                  user ?
                    <>
                      <Link to="/articles/create" className="item">Create an article</Link>
                      <Link to="/logout" className="item">Logout</Link>
                    </>
                    :
                    <>
                      <Link to="/login" className="item">Login</Link>
                    </>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="ui header">Articles</div>
        <div className="ui feed">
          {
            articles.map((article, index) => (
              <ArticleListItem key={article.id} article={article} user={user} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default ArticlesMain;