import React from "react";
import { Link, useLocation } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AppRoute } from "../../routes";

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
                        <Link to={route.path} style={{ color: 'inherit', textDecoration: 'none' }} key={index}>
                            <ListItem button key={index} selected={location.pathname === route.path}>
                                <ListItemIcon>{route.icon}</ListItemIcon>
                                <ListItemText primary={route.label}/>
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
        </div>
    )
};

export default SidebarComponent;