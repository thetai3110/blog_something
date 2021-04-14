import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import './index.css';
import { useAuth } from './contexts/auth_context';
import AuthProvider from './contexts/auth_context';
import { useEffect } from 'react';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import React from 'react';
import { Suspense } from 'react';
import { connect } from 'react-redux';
import { themes } from './themes/themes';

const BlogPage = React.lazy(() => import('./pages/blog/blog.page'));
const HomePage = React.lazy(() => import('./pages/home/home.page'));
const DiscussPage = React.lazy(() => import('./pages/discuss/discuss.page'));
const BlogDetailPage = React.lazy(() => import('./pages/blog/detail/blog-detail.page'));
const LoginPage = React.lazy(() => import('./pages/login/login.page'));
const ForgotPasswordPage = React.lazy(() => import('./pages/login/forgot.page'));
const BlogCreate = React.lazy(() => import('./pages/blog/create/blog-create.page'));
const SignUpPage = React.lazy(() => import('./pages/login/signup.page'));

function App({ currentUser, location, curentTheme }) {
  if (location.pathname !== '/login' && location.pathname !== '/logout' && location.pathname !== '/signup' && location.pathname !== '/forgot-password')
    return (
      <AuthProvider>
        <HeaderComponent theme={curentTheme}/>
        <div className="body-app" style={themes[curentTheme].body}>
          <div className="grid wide">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/" component={HomePage} exact></Route>
                <Route path="/blog" component={BlogPage} exact></Route>
                <Route path="/blog/:page" component={BlogPage} exact></Route>
                <Route path="/blog/detail/:id" render={(props) => <BlogDetailPage {...props} />} exact></Route>
                <Route path="/discuss" render={() => <DiscussPage />} exact></Route>
                <Route path="/create-blog" render={(props) => <BlogCreate {...props} />}></Route>
              </Switch>
            </Suspense>
          </div>
        </div>
        {location.pathname !== '/create-blog' ? <div style={themes[curentTheme].footer}><FooterComponent theme={curentTheme}/></div> : null}
      </AuthProvider>
    );
  else return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/signup" component={SignUpPage}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/forgot-password" component={ForgotPasswordPage}></Route>
        </Switch>
      </Suspense>
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

const mapStateToProps = ({ user, themes }) => ({
  currentUser: user.currentUser,
  curentTheme: themes.curentTheme
})
export default withRouter(connect(mapStateToProps)(App));
