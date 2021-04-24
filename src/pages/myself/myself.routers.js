import React from "react";
import { Suspense } from "react";
import { Route, Switch, withRouter } from "react-router"
import Loading from "../../components/loading/loading";

const DraftPage = React.lazy(() => import('../myself/posts/draft/draft.page'));
const PublicsPage = React.lazy(() => import('../myself/posts/public/public.page'));
const PrivatesPage = React.lazy(() => import('../myself/posts/private/private.page'));

const MySelfRouters = ({ match, theme }) => {
    return <Suspense fallback={<Loading />}>
        <Switch>
            <Route path={`${match.path}/draft`} render={(props)=> <DraftPage {...props} theme={theme}/>} exact></Route>
            <Route path={`${match.path}/draft/:page`} render={(props)=> <DraftPage {...props} theme={theme}/>} exact></Route>
            <Route path={`${match.path}/public`} render={(props)=> <PublicsPage {...props} theme={theme}/>} exact></Route>
            <Route path={`${match.path}/public/:page`} render={(props)=> <PublicsPage {...props} theme={theme}/>} exact></Route>
            <Route path={`${match.path}/private`} render={(props)=> <PrivatesPage {...props} theme={theme}/>} exact></Route>
            <Route path={`${match.path}/private/:page`} render={(props)=> <PrivatesPage {...props} theme={theme}/>} exact></Route>
        </Switch>
    </Suspense>
}

export default withRouter(MySelfRouters);