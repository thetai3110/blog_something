import React from "react";
import { Suspense } from "react";
import { Route, Switch, withRouter } from "react-router"
import Loading from "../../components/loading/loading";

const DraftPage = React.lazy(() => import('../myself/pages/posts/draft/draft.page'));
const PublicsPage = React.lazy(() => import('../myself/pages/posts/public/public.page'));
const PrivatesPage = React.lazy(() => import('../myself/pages/posts/private/private.page'));

const PersonRouters = ({ match }) => {
    return <Suspense fallback={<Loading />}>
        <Switch>
            <Route path={`${match.path}/draft`} component={DraftPage} exact></Route>
            <Route path={`${match.path}/draft/:page`} component={DraftPage} exact></Route>
            <Route path={`${match.path}/public`} component={PublicsPage} exact></Route>
            <Route path={`${match.path}/public/:page`} component={PublicsPage} exact></Route>
            <Route path={`${match.path}/private`} component={PrivatesPage} exact></Route>
            <Route path={`${match.path}/private/:page`} component={PrivatesPage} exact></Route>
        </Switch>
    </Suspense>
}

export default withRouter(PersonRouters);