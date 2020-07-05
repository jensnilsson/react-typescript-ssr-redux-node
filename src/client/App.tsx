import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "client/pages/Home";
import Test from "client/pages/Test";
import AppBar from "client/containers/AppBar/AppBar.component";

export default class App extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <AppBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/test" component={Test} />
                </Switch>
            </React.Fragment>
        );
    }
}
