import { Route, Switch } from 'react-router-dom';
import './App.css';
import BlogPage from './pages/blog_page/blog_page';
import HomePage from './pages/home_page/home_page';

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} exact></Route>
      <Route path="/blog" component={BlogPage} exact></Route>
    </Switch>
  );
}

export default App;
