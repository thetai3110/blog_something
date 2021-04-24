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
import Loading from './components/loading/loading';

const BlogPage = React.lazy(() => import('./pages/blog/blog.page'));
const HomePage = React.lazy(() => import('./pages/home/home.page'));
const DiscussPage = React.lazy(() => import('./pages/discuss/discuss.page'));
const BlogDetailPage = React.lazy(() => import('./pages/blog/detail/blog-detail.page'));
const LoginPage = React.lazy(() => import('./pages/login/login.page'));
const ForgotPasswordPage = React.lazy(() => import('./pages/login/forgot.page'));
const BlogCreate = React.lazy(() => import('./pages/blog/create-or-modify/blog-create.page'));
const BlogModify = React.lazy(() => import('./pages/blog/create-or-modify/blog-modify.page'));
const SignUpPage = React.lazy(() => import('./pages/login/signup.page'));
const MyPostsPage = React.lazy(() => import('./pages/myself/posts/posts.page'));

function App({ location, currentTheme }) {
  if (location.pathname !== '/login' && location.pathname !== '/logout' && location.pathname !== '/signup' && location.pathname !== '/forgot-password')
    return (
      <AuthProvider>
        <HeaderComponent theme={currentTheme} />
        <div style={{ ...themes[currentTheme].background_body, flexGrow: 1, position: 'relative' }}>
          <div className="grid wide" style={{ height: '100%' }}>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path="/" render={(props) => <HomePage {...props} theme={currentTheme}/>} exact></Route>
                <Route path="/blogs" render={(props) => <BlogPage {...props} theme={currentTheme} />} exact></Route>
                <Route path="/blogs/:page" render={(props) => <BlogPage {...props} theme={currentTheme} />} exact></Route>
                <Route path="/blog/detail/:id" render={(props) => <BlogDetailPage {...props} theme={currentTheme}/>} exact></Route>
                <Route path="/discuss" render={() => <DiscussPage theme={currentTheme}/>} exact></Route>
                <Route path="/blog/create" render={(props) => <BlogCreate {...props} theme={currentTheme}/>} exact></Route>
                <Route path="/blog/modify/:id" render={(props) => <BlogModify {...props} theme={currentTheme}/>}></Route>
                <Route path="/myself" render={(props) => <MyPostsPage {...props} theme={currentTheme}/>}></Route>
              </Switch>
            </Suspense>
          </div>
        </div>
        { location.pathname !== '/blog/create' ? <FooterComponent theme={currentTheme} /> : null}
      </AuthProvider >
    );
  else return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
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
  currentTheme: themes.currentTheme
})
export default withRouter(connect(mapStateToProps)(App));
