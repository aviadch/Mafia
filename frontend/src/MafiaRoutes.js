import React from 'react';

import WelcomeScreen from './screens/WelcomeScreen';
import WaitingRoom from './screens/WaitingRoom';
import { Switch, Route } from 'react-router-dom';
import { ROOM_ROUTES } from './shared_code/consts';

const MafiaRoutes = () => {
  return (
    <div className="MafiaApp">
      <Switch>
        <Route path={`/${ROOM_ROUTES}`} component={WaitingRoom}></Route>
        <Route path="/" component={WelcomeScreen}></Route>
      </Switch>
    </div>
  );
};

export default MafiaRoutes;
