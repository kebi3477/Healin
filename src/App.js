import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './css/common.css';
import Login from './js/login';
import Main from './js/main';
import Chatting from './js/chatting';
import Rankking from './js/rankking';
import Profile from './js/profile';

class App extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Login}/>
        <Route exact path="/main" component={Main}/>
        <Route exact path="/chatting" component={Chatting}/>
        <Route exact path="/rankking" component={Rankking}/>
        <Route exact path="/mypage" component={Profile}/>
      </Router>
    );
  }
}

export default App;