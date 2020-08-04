import React from 'react';
import './App.css';
import {CompoundInterestPage} from "./layout/organism/CompoundInterestPage";
import {Route, Switch} from "react-router";
import {myUrl} from "./layout/Urls";
import ResponsiveDrawer from "./layout/molecules/DrawerMenu";
import {FirePage} from "./layout/organism/FirePage";

function App() {
  return (
    <ResponsiveDrawer>
      <Switch>
        <Route exact path={myUrl.top}>
          <CompoundInterestPage />
        </Route>
        <Route exact path={myUrl.fire}>
          <FirePage />
        </Route>
      </Switch>
    </ResponsiveDrawer>
  );
}

export default App;
