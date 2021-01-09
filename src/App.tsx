import React, {useState} from 'react';
import Sidebar from "react-sidebar";
import {BrowserRouter, Switch} from "react-router-dom";
<<<<<<< HEAD
import Amplify from 'aws-amplify';
import {routes} from "./routes";
import SidebarComponent from './components/sidebar/Sidebar';
import RoutesComponent from './components/routes/Routes';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
=======
import Amplify, { Auth } from 'aws-amplify';
import {routes} from "./routes";
import SidebarComponent from './components/sidebar/Sidebar';
import RoutesComponent from './components/routes/Routes';
import { withAuthenticator } from '@aws-amplify/ui-react';
>>>>>>> 01177ee502e73da2a406c378ce08983f7449a858

import { config } from "./amplify-config"
import './App.scss';
import DocumentComponent from "./components/documents/document/DocumentComponent";

Amplify.configure(config);

function App() {
    const [appRoutes,] = useState(routes);

    return (
        <BrowserRouter>
            <div id="main--app">
                <Sidebar
<<<<<<< HEAD
                    sidebar={<SidebarComponent title='Document Management' routes={appRoutes}/>}
=======
                    sidebar={<SidebarComponent title='AWS App' routes={appRoutes.filter(r => r.visible)}/>}
>>>>>>> documents
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
