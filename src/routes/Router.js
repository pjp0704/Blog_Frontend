import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import PostCardList from './public/PostCardList';
import PostWrite from './public/PostWrite';
import PostDetail from './public/PostDetail';
import CategoryResult from './public/CategoryResult';
import Search from './public/Search';

const MainRouter = () => (
  <>
    <NavigationBar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/posts" exact component={PostWrite} />
        <Route path="/posts/:id" exact component={PostDetail} />
        <Route
          path="/posts/category/:categoryName"
          exact
          component={CategoryResult}
        />
        <Route path="/search/:searchTerm" exact component={Search} />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </>
);

export default MainRouter;
