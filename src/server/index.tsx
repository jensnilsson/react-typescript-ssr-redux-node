import * as React from "react";
import * as ReactDOM from "react-dom/server";
import * as Express from "express";
import * as Redux from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter as Router } from "react-router-dom";
import { SheetsRegistry } from "react-jss";

import App from "client/App";
import { changeTitle } from "client/redux/reducers/title";

declare const module: any;

function main() {
    const express = Express();
    const port = 8080;

    express.use(Express.static("build"));

    express.get("/*", (req, res, next) => {
        const store = Redux.createStore(changeTitle);
        const sheetsRegistry = new SheetsRegistry();

        const appHTML = ReactDOM.renderToString(
            <ReduxProvider store={store}>
                <Router location={req.path} context={{}}>
                    <App />
                </Router>
            </ReduxProvider>
        );
        const appInitialState = JSON.stringify(store.getState()).replace(
            /</g,
            "\\u003c"
        );
        const appCSS = sheetsRegistry.toString();

        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>TypeScript ReactJS SSR App</title>
                    <style>
                        body {
                            margin: 0px;
                            padding: 0px;
                        }
                    </style>
                    <style id="jss-server-side">${appCSS}</style>
                </head>
                <body>
                    <main id="root">${appHTML}</main>
                    <script>
                        window["__PRELOADED_STATE__"] = ${appInitialState}
                    </script>
                    <script type="application/javascript" src="bundle.js"></script>
                </body>
            </html>
        `);
        res.end();
        next();
    });

    const server = express.listen(port);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => server.close());
    }
}

main();
