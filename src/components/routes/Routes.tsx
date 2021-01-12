import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {AppRoute} from '../../routes';
import {useAuthorizedRoute} from "../../hooks/authentication";

const AuthenticatedRoute: React.FC<{ route: AppRoute } | any> = ({route, ...props}) => {
    const isRouteAuthorized = useAuthorizedRoute();
    const currentRoute = (route as AppRoute);

    return (
        <Route path={currentRoute.path}
               exact={currentRoute.exact || false}
               children={
                   <React.Suspense fallback={() => <div>Loading...</div>}>
                       <div className='route--container'>
                           {currentRoute.component(props)}
                       </div>
                   </React.Suspense>
                   // isRouteAuthorized(currentRoute)
                   //     ? (
                   //         <React.Suspense fallback={() => <div>Loading...</div>}>
                   //             <div className='route--container'>
                   //                 {currentRoute.component(props)}
                   //             </div>
                   //         </React.Suspense>
                   //     )
                   //     : (
                   //         <Redirect to='/'/>
                   //     )
               }
        />
    )
};

const RoutesComponent: React.FC<{ routes: AppRoute[] } | any> = ({routes, ...props}) => (
    <React.Fragment>
        {
            routes.map((route: AppRoute, index: number) => (
                <AuthenticatedRoute key={index} route={route} {...props} />
            ))
        }
    </React.Fragment>
);

export default RoutesComponent;