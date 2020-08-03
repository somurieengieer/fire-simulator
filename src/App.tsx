import React from 'react';
import './App.css';
import {CompoundInterestPage} from "./layout/organism/CompoundInterestPage";
import {Route, Switch} from "react-router";
import {myUrl} from "./layout/Urls";
import ResponsiveDrawer from "./layout/molecules/DrawerMenu";

function App() {
  return (
    <ResponsiveDrawer>
      <Switch>
        <Route exact path={myUrl.topPage}>
          <CompoundInterestPage />
        </Route>
      </Switch>
    </ResponsiveDrawer>
  );
}

export default App;
