import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBar from './main/nav';
import MainPage from './main/main';
import '../../public/css/wrapper.css';
import Calendar from './calendar/calendar';

const App = () => (
    <div className="wrapper-main">
        <NavBar />
        <Switch>
            <AuthRoute exact path="/" component={MainPage} />
            <Route path="/calendar" component={Calendar} />
        </Switch>
    </div>
);

export default App;