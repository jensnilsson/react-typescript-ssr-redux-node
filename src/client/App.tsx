import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "client/pages/Home";
import Test from "client/pages/Test";

export default class App extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/test" component={Test} />
                </Switch>
            </React.Fragment>
        );
    }
}
