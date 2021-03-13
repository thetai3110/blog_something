import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import BlogPage from './pages/blog/blog_page';
import HomePage from './pages/home/home_page';
import DiscussPage from './pages/discuss/discuss_page';
import CodeOnlinePage from './pages/code_online_page/code_online_page';
import BlogDetailPage from './pages/blog/detail/blog_detail';
import { useAuth } from './contexts/auth_context';
import AuthProvider from './contexts/auth_context';
import { useEffect } from 'react';
// import { PrivateRoute } from './private/private_router';
import BlogCreate from './pages/blog/create/blog_create';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import LoginPage from './pages/login/login_page';
import ForgotPasswordPage from './pages/login/forgot_page';
import SignUpPage from './pages/login/signup_page';

function App() {
  const location = useLocation();
  if (location.pathname !== '/login' && location.pathname !== '/logout' && location.pathname !== '/signup' && location.pathname !== '/forgot-password')
    return (
      <AuthProvider>
        <HeaderComponent />
        <div style={{ backgroundColor: '#f8f9fb' }}>
          <div style={{ paddingTop: '25px', paddingBottom: '25px' }} className="container-xl">
            <Switch>
              <Route path="/" component={HomePage} exact></Route>
              <Route path="/blog" component={BlogPage} exact></Route>
              <Route path="/blog/:page" component={BlogPage} exact></Route>
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
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/signup" component={SignUpPage}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/forgot-password" component={ForgotPasswordPage}></Route>
      </Switch>
    </AuthProvider>
  )
}

const Logout = ({ history }) => {
  const TAG = 'Logout'
  const { logout } = useAuth()
  useEffect(() => {
    async function handleLogout() {
      try {
        await logout()
        history.push("/login")
      } catch (error) {
        console.log(TAG + ': ' + error)
      }
    }
    handleLogout();
  }, [])
  return (<div>Logout...</div>)
}

export default App;
