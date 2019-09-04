import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import MainPage from './main/main';

const App = () => (
    <Switch>
        <AuthRoute exact path="/" component={MainPage} />
    </Switch>
);

export default App;