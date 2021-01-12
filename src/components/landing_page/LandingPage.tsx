import React from "react";

import './LandingPage.scss';
import {useCurrentUser} from "../../hooks/authentication";

const LandingPage = () => {
    const {username} = useCurrentUser();

    return (
        <React.Fragment>
            <div className='lading--page'>
                <h2>Hello {username}</h2>
                <h3>Welcome to Document Management System</h3>
            </div>
        </React.Fragment>
    )
};

export default LandingPage;