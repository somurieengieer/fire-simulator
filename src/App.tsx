import React, { lazy, Suspense } from 'react'
import './App.css'
import { Route, Switch } from 'react-router'
import { myUrl } from './layout/Urls'
import MenuFrame from './layout/molecules/menu/MenuFrame'

const FirePage = lazy(() => import('./layout/organism/FirePage'))
const TaxPage = lazy(() => import('./layout/organism/TaxPage'))
const AnnuityPage = lazy(() => import('./layout/organism/AnnuityPage'))
const BlogPage = lazy(() => import('./layout/organism/BlogPage'))
const BlogListPage = lazy(() => import('./layout/organism/BlogListPage'))

function App () {
  return (
    <MenuFrame>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={myUrl.top} component={FirePage}/>
          {/* <CompoundInterestPage /> */}
          <Route exact path={myUrl.tax} component={TaxPage}/>
          <Route exact path={myUrl.annuity} component={AnnuityPage}/>
          <Route exact path={myUrl.blogList} component={BlogListPage}/>
          <Route exact path={myUrl.blog} component={BlogPage}/>
          <Route>
            404 Not Found
          </Route>
        </Switch>
      </Suspense>
    </MenuFrame>
  )
}

export default App
