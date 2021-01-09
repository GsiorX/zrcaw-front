import React from "react";
import { Link, useLocation } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AppRoute } from "../../routes";
<<<<<<< HEAD
import { AmplifySignOut } from '@aws-amplify/ui-react';

import "./Sidebar.scss";

const SidebarComponent: React.FC<{ title: string, routes: AppRoute[] }> = ({title, routes}) => {
    const location = useLocation();

    const shouldDisplay = (route: AppRoute) => {
        if(route.hidden === undefined || route.hidden === null) {
            return true;
        }
        return !route.hidden;
    }

    return (
        <div className='sidebar--content'>
            <div className='app--title'>
                <p className='title'>{title}</p>
            </div>
            <List className='route--list'>
                {
                    routes
                    .filter(route => shouldDisplay(route))
                    .map((route, index) => (
=======

const SidebarComponent: React.FC<{ title: string, routes: AppRoute[] }> = ({title, routes}) => {
    const location = useLocation();
    return (
        <div>
            <div className='app--title'>
                <p className='title'>{title}</p>
            </div>
            <List>
                {
                    routes.map((route, index) => (
>>>>>>> 01177ee502e73da2a406c378ce08983f7449a858
                        <Link to={route.path} style={{ color: 'inherit', textDecoration: 'none' }} key={index}>
                            <ListItem button key={index} selected={location.pathname === route.path}>
                                <ListItemIcon>{route.icon}</ListItemIcon>
                                <ListItemText primary={route.label}/>
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
<<<<<<< HEAD
            <AmplifySignOut className="signout" />
=======
>>>>>>> 01177ee502e73da2a406c378ce08983f7449a858
        </div>
    )
};

export default SidebarComponent;