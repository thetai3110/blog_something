import { Route, Switch } from 'react-router-dom';
import './App.css';
import BlogPage from './pages/blog_page/blog_page';
import HomePage from './pages/home_page/home_page';
import DiscussPage from './pages/discuss_page/discuss_page';
import CodeOnlinePage from './pages/code_online_page/code_online_page';
import { AdminPage } from './pages/admin_page/admin_page';

function App() {
  return (
    <Switch>
      <Route path="/" render={() => <HomePage />} exact></Route>
      <Route path="/blog" render={() => <BlogPage />} exact></Route>
      <Route path="/discuss" render={() => <DiscussPage />} exact></Route>
      <Route path="/code-online" render={() => <CodeOnlinePage />} exact></Route>
      <Route path="/admin" render={() => <AdminPage />}></Route>
    </Switch>
  );
}

export default App;
