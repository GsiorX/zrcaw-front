import React from 'react';
import {Route} from "react-router-dom";
import { AppRoute } from '../../routes';

const RoutesComponent: React.FC<{ routes: AppRoute[] } | any> = ({routes, ...props}) => (
    <React.Fragment>
        {
            routes.map((route: AppRoute, index: number) => (
                <Route key={index}
                       path={route.path}
                       exact={route.exact || false}
                       children={
                           <React.Suspense fallback={() => <div>Loading...</div>}>
                               <div className='route--container'>
                                   { route.component(props) }
                               </div>
                           </React.Suspense>
                       }
                />
            ))
        }
    </React.Fragment>
);

export default RoutesComponent;