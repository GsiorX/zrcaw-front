import React from "react";
import { Link, useLocation } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AppRoute } from "../../routes";
import { AmplifySignOut } from '@aws-amplify/ui-react';

import "./Sidebar.scss";
import {useAuthorizedRoute} from "../../hooks/authentication";

const SidebarComponent: React.FC<{ title: string, routes: AppRoute[] }> = ({title, routes}) => {
    const location = useLocation();
    const isRouteAuthorized = useAuthorizedRoute();

    const shouldDisplay = (route: AppRoute) => {
        if(!isRouteAuthorized(route)) {
            return false;
        }
        if(route.hidden === undefined || route.hidden === null) {
            return true;
        }
        return !route.hidden;
    };

    const generateRouteList = (routes: AppRoute[]) => {
        return routes
            .filter(route => shouldDisplay(route))
            .map((route, index) => (
                <Link to={route.path} style={{ color: 'inherit', textDecoration: 'none' }} key={index}>
                    <ListItem button key={index} selected={location.pathname === route.path}>
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.label}/>
                    </ListItem>
                </Link>
            ));
    }

    return (
        <div className='sidebar--content'>
            <div className='app--title'>
                <p className='title'>{title}</p>
            </div>
            <List className='route--list'>
                { generateRouteList(routes) }
            </List>
            <AmplifySignOut className="signout" />
        </div>
    )
};

export default SidebarComponent;