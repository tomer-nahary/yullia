import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/App.css';
import Login from './Login';
import Home from './Home';
import DayView from './DayView';
import { UserContext } from '../contexts/UserContext';

function App() {
  return (
    <UserContext>
      <Router>
        <Switch>
          <Route path='/login'><Login /></Route>
          <Route exact path='/:branch/:year/:month/:day/:tab?'><DayView/></Route>
          <Route exact path='/:branch/:year/:month'><Home/></Route>
          {<Route path='/'><Home/></Route>}
          <Route><h1 style={{direction: 'ltr', textAlign: 'center'}}>404 - Page Not Found!</h1></Route>
        </Switch>
      </Router>
    </UserContext>
  );
}

export default App;