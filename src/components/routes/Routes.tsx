import React from 'react';
import {Route} from "react-router-dom";
import { AppRoute } from '../../routes';

const RoutesComponent: React.FC<{ routes: AppRoute[] }> = ({routes}) => (
    <React.Fragment>
        {
            routes.map((route, index) => (
                <Route key={index}
                       path={route.path}
                       exact={route.exact || false}
                       children={
                           <React.Suspense fallback={() => <div>Loading...</div>}>
                               <div className='route--container'>
                                   <route.component />
                               </div>
                           </React.Suspense>
                       }
                />
            ))
        }
    </React.Fragment>
);

export default RoutesComponent;