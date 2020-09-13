import React, {lazy, Suspense} from 'react'
import './App.css'
import {Route, Switch} from 'react-router'
import {myUrl} from './layout/Urls'
import MenuFrame from './layout/molecules/menu/MenuFrame'

const FirePage = lazy(() => import('./layout/organism/FirePage'))
const TaxPage = lazy(() => import('./layout/organism/TaxPage'))
const AnnuityPage = lazy(() => import('./layout/organism/AnnuityPage'))

function App() {
  return (
    <MenuFrame>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={myUrl.top} component={FirePage}/>
          {/* <CompoundInterestPage /> */}
          <Route exact path={myUrl.tax} component={TaxPage}/>
          <Route exact path={myUrl.annuity} component={AnnuityPage}/>
          <Route>
            404 Not Found
          </Route>
        </Switch>
      </Suspense>
    </MenuFrame>
  )
}

export default App
