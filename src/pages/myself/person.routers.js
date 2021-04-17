import React from "react";
import { Suspense } from "react";
import { Route, Switch, withRouter } from "react-router"
import Loading from "../../components/loading/loading";

const DraftPage = React.lazy(() => import('./pages/draft/draft.page'));

const PersonRouters = ({ match }) => {
    return <Suspense fallback={<Loading />}>
        <Switch>
            <Route path={`${match.path}/draft`} component={DraftPage} exact></Route>
            <Route path={`${match.path}/public`} exact></Route>
            <Route path={`${match.path}/private`} exact></Route>
        </Switch>
    </Suspense>
}

export default withRouter(PersonRouters);