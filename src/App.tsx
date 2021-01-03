import React, {useState} from 'react';
import Sidebar from "react-sidebar";
import {BrowserRouter, Switch} from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import {routes} from "./routes";
import SidebarComponent from './components/sidebar/Sidebar';
import RoutesComponent from './components/routes/Routes';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { config } from "./amplify-config"
import './App.scss';

Amplify.configure(config);

function App() {
    const [appRoutes,] = useState(routes);

    return (
        <BrowserRouter>
            <div id="main--app">
                <Sidebar
                    sidebar={<SidebarComponent title='AWS App' routes={appRoutes}/>}
                    open={true}
                    docked={true}
                >
                    <div className="main--content">
                        <Switch>
                            <RoutesComponent routes={appRoutes}/>
                        </Switch>
                    </div>
                </Sidebar>
            </div>
        </BrowserRouter>
    );
}

export default withAuthenticator(App);
