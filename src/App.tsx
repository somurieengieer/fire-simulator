import React, { lazy, Suspense } from 'react'
import './App.css'
import { Route, Switch } from 'react-router'
import { myUrl } from './layout/Urls'
import MenuFrame from './layout/molecules/menu/MenuFrame'
import { Loading } from './layout/atoms/Loading'

const FirePage = lazy(() => import('./layout/organism/FirePage'))
const TaxPage = lazy(() => import('./layout/organism/TaxPage'))
const AnnuityPage = lazy(() => import('./layout/organism/AnnuityPage'))
const BlogPage = lazy(() => import('./layout/organism/BlogPage'))
const BlogListPage = lazy(() => import('./layout/organism/BlogListPage'))

function App () {
  return (
    <MenuFrame>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact={true} path={myUrl.top} component={FirePage}/>
          <Route exact={true} path={myUrl.tax} component={TaxPage}/>
          <Route exact={true} path={myUrl.annuity} component={AnnuityPage}/>
          <Route exact={true} path={myUrl.blogList} component={BlogListPage}/>
          <Route exact={true} path={myUrl.blog} component={BlogPage}/>
          <Route>
            404 Not Found
          </Route>
        </Switch>
      </Suspense>
    </MenuFrame>
  )
}

export default App
