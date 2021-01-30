import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home_page/home_page';

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} exact></Route>
    </Switch>
  );
}

export default App;
