import { Route, Switch } from 'react-router-dom';
import './App.css';
import BlogPage from './pages/blog_page/blog_page';
import HomePage from './pages/home_page/home_page';
import DiscussPage from './pages/discuss_page/discuss_page';
import CodeOnlinePage from './pages/code_online_page/code_online_page';

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} exact></Route>
      <Route path="/blog" component={BlogPage} exact></Route>
      <Route path="/discuss" component={DiscussPage} exact></Route>
      <Route path="/code-online" component={CodeOnlinePage} exact></Route>
    </Switch>
  );
}

export default App;
