import React, {createContext, useEffect, useState} from 'react';
import Sidebar from "react-sidebar";
import {BrowserRouter, Switch} from "react-router-dom";
import Amplify from 'aws-amplify';
import {routes} from "./routes";
import SidebarComponent from './components/sidebar/Sidebar';
import RoutesComponent from './components/routes/Routes';
import {AmplifyAuthenticator, withAuthenticator} from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';
import {CognitoUserSession} from 'amazon-cognito-identity-js';

import {config} from "./amplify-config"
import './App.scss';

Amplify.configure(config);

interface AuthContext {
    session?: CognitoUserSession;
}

export const AuthContext = createContext<AuthContext>({});

function App() {
    const [authContext, setAuthContext] = useState<AuthContext>();
    const [appRoutes,] = useState(routes);

    useEffect(() => {
        const getAuthContext = async () => {
            return {
                session: await Auth.currentSession()
            }
        };

        getAuthContext().then(context => setAuthContext(context));
    }, []);

    return (
        <BrowserRouter>
            {/*<AmplifyAuthenticator>*/}
                <React.Fragment>
                    {
                        authContext
                            ? (<AuthContext.Provider value={authContext}>
                                    <div id="main--app">
                                        <Sidebar
                                            sidebar={<SidebarComponent title='Document Management' routes={appRoutes}/>}
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
                                </AuthContext.Provider>
                            )
                            : (
                                <div>Fetching AuthContext...</div>
                            )
                    }
                </React.Fragment>
            {/*</AmplifyAuthenticator>*/}
        </BrowserRouter>
    )
}

export default withAuthenticator(App);

// export default App;