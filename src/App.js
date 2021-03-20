import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import { useAuth } from './contexts/auth_context';
import AuthProvider from './contexts/auth_context';
import { useEffect } from 'react';
// import { PrivateRoute } from './private/private_router';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import React from 'react';
import { Suspense } from 'react';
// import LoginPage from './pages/login/login_page';
// import ForgotPasswordPage from './pages/login/forgot_page';
// import SignUpPage from './pages/login/signup_page';
// import BlogPage from './pages/blog/blog_page';
// import HomePage from './pages/home/home_page';
// import DiscussPage from './pages/discuss/discuss_page';
// import CodeOnlinePage from './pages/code_online_page/code_online_page';
// import BlogDetailPage from './pages/blog/detail/blog_detail';
// import BlogCreate from './pages/blog/create/blog_create';

const BlogPage = React.lazy(() => import('./pages/blog/blog_page'));
const HomePage = React.lazy(() => import('./pages/home/home_page'));
const DiscussPage = React.lazy(() => import('./pages/discuss/discuss_page'));
const CodeOnlinePage = React.lazy(() => import('./pages/code_online_page/code_online_page'));
const BlogDetailPage = React.lazy(() => import('./pages/blog/detail/blog_detail'));
const LoginPage = React.lazy(() => import('./pages/login/login_page'));
const ForgotPasswordPage = React.lazy(() => import('./pages/login/forgot_page'));
const BlogCreate = React.lazy(() => import('./pages/blog/create/blog_create'));
const SignUpPage = React.lazy(() => import('./pages/login/signup_page'));

function App() {
  const location = useLocation();
  if (location.pathname !== '/login' && location.pathname !== '/logout' && location.pathname !== '/signup' && location.pathname !== '/forgot-password')
    return (
      <AuthProvider>
        <HeaderComponent />
        <div style={{ backgroundColor: '#f8f9fb' }}>
          <div style={{ paddingTop: '25px', paddingBottom: '25px' }} className="container-xl">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/" component={HomePage} exact></Route>
                <Route path="/blog" component={BlogPage} exact></Route>
                <Route path="/blog/:page" component={BlogPage} exact></Route>
                <Route path="/blog/detail/:id" render={(props) => <BlogDetailPage {...props} />} exact></Route>
                <Route path="/discuss" render={() => <DiscussPage />} exact></Route>
                <Route path="/code-online" render={() => <CodeOnlinePage />} exact></Route>
                <Route path="/create-blog" render={(props) => <BlogCreate {...props} />}></Route>
              </Switch>
            </Suspense>
          </div>
        </div>
        {location.pathname !== '/create-blog' ? <FooterComponent /> : null}
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
