import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import BlogPage from './pages/blog_page/blog_page';
import HomePage from './pages/home_page/home_page';
import DiscussPage from './pages/discuss_page/discuss_page';
import CodeOnlinePage from './pages/code_online_page/code_online_page';
import { AdminPage } from './pages/admin_page/admin_page';
import BlogDetailPage from './pages/blog_page/detail/blog_detail';
import { ForgotPasswordPage, LoginPage, SignUpPage } from './pages/login_page/login_page';
import { AuthProvider, useAuth } from './contexts/auth_context';
import { useEffect, useState } from 'react';
import { PrivateRoute } from './private/private_router';
// import firebase from 'firebase';
// import { useEffect, useState } from 'react';

// Configure Firebase.
// const config = {
//   apiKey: 'AIzaSyBSMSeC7qR__N-4-muaSwdjOWcdN6OHuoI',
//   authDomain: 'blog-something.firebaseapp.com',
//   // ...
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// } else {
//   firebase.app();
// }

function App() {
  //const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
  //     if (!user) {
  //       console.log('Not login');
  //       return;
  //     }
  //     //setIsSignedIn(!!user);
  //     console.log('Login user: ' + user.displayName);
  //   });
  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  return (
    <AuthProvider>
      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/blog" render={(props) => <BlogPage {...props} />} exact></Route>
        <Route path="/blog/:page" render={(props) => <BlogPage {...props} />} exact></Route>
        <Route path="/blog/detail/:id" render={(props) => <BlogDetailPage {...props} />} exact></Route>
        <Route path="/discuss" render={() => <DiscussPage />} exact></Route>
        <Route path="/code-online" render={() => <CodeOnlinePage />} exact></Route>
        <Route path="/admin" render={() => <AdminPage />}></Route>
        <Route path="/login" render={() => <LoginPage />}></Route>
        <Route path="/signup" render={() => <SignUpPage />}></Route>
        <Route path="/logout" render={() => <Logout />}></Route>
        <Route path="/forgot-password" render={() => <ForgotPasswordPage />}></Route>
      </Switch>
    </AuthProvider>
  );
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
