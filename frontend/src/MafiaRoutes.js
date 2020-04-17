import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import WaitingRoom from './screens/WaitingRoom';

import { ROOM_ROUTES } from './shared_code/consts';

const MafiaRoutes = () => (
  <div className="MafiaApp">
    <Switch>
      <Route path={`/${ROOM_ROUTES}`} component={WaitingRoom} />
      <Route path="/" component={WelcomeScreen} />
    </Switch>
  </div>
);

export default MafiaRoutes;
