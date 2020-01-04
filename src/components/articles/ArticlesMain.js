import React from 'react';
import { Link } from 'react-router-dom';

import ArticleListItem from './ArticleListItem';
import '../../css/ArticlesMain.css';
import { getArticles } from '../../actions/ApiClient';
import customLocalStorage from '../../utils/customLocalStorage';

class Articles extends React.Component {

  constructor(props) {
    super(props);
    this.user = customLocalStorage.getItem('user');
    this.state = {
      articles: [{content: '2', id: 2}, {content: '3', id: 3}]
    };
  }

  componentDidMount() {
    getArticles()
      /*.then(response => this.setState({
        articles: [{content: '1', id: 1}, {content: '2', id: 2}, {content: '3', id: 3}]
      }))*/
      .then(response => {
        setTimeout(() => {
          this.setState({
            articles: [{content: '1', id: 1}, {content: '2', id: 2}, {content: '3', id: 3}]
          })
        }, 5000);
      })
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
              <ArticleListItem key={article.id} article={article} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Articles;