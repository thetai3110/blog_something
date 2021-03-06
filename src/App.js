import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import BlogPage from './pages/blog/blog_page';
import HomePage from './pages/home/home_page';
import DiscussPage from './pages/discuss/discuss_page';
import CodeOnlinePage from './pages/code_online_page/code_online_page';
import BlogDetailPage from './pages/blog/detail/blog_detail';
import { ForgotPasswordPage, LoginPage, SignUpPage } from './pages/login/login_page';
import { AuthProvider, useAuth } from './contexts/auth_context';
import { useEffect } from 'react';
// import { PrivateRoute } from './private/private_router';
import { BlogCreate } from './pages/blog/create/blog_create';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';

function App() {
  const location = useLocation();
  if (location.pathname !== '/login' && location.pathname !== '/logout' && location.pathname !== '/signup' && location.pathname !== '/forgot-password')
    return (
      <AuthProvider>
        <HeaderComponent />
        <div style={{ backgroundColor: '#f8f9fb'}}>
          <div style={{ paddingRight: '10%', paddingLeft: '10%', paddingTop: '25px', paddingBottom: '25px' }}>
            <Switch>
              <Route path="/" component={HomePage} exact></Route>
              <Route path="/blog" render={(props) => <BlogPage {...props} />} exact></Route>
              <Route path="/blog/:page" render={(props) => <BlogPage {...props} />} exact></Route>
              <Route path="/blog/detail/:id" render={(props) => <BlogDetailPage {...props} />} exact></Route>
              <Route path="/discuss" render={() => <DiscussPage />} exact></Route>
              <Route path="/code-online" render={() => <CodeOnlinePage />} exact></Route>
              <Route path="/create-blog" render={(props) => <BlogCreate {...props} />}></Route>
            </Switch>
          </div>
        </div>
        {location.pathname !== '/create-blog' ? <FooterComponent /> : ''}
      </AuthProvider>
    );
  else return (
    <AuthProvider>
      <Switch>
        <Route path="/login" render={() => <LoginPage />}></Route>
        <Route path="/signup" render={() => <SignUpPage />}></Route>
        <Route path="/logout" render={() => <Logout />}></Route>
        <Route path="/forgot-password" render={() => <ForgotPasswordPage />}></Route>
      </Switch>
    </AuthProvider>
  )
}

const Logout = () => {
  const TAG = 'Logout'
  const { logout } = useAuth()
  const history = useHistory()
  useEffect(() => {
    (async function () {
      try {
        await logout()
        history.push("/login")
      } catch (error) {
        console.log(TAG + ': ' + error)
      }
    })();
  }, [])
  return (<div>Logout...</div>)
}

export default App;
