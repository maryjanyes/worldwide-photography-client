import React from 'react';
import { Link } from 'react-router-dom';

import { ApiService, apiService } from 'services/api.service';

const TopBarSignItems = () => {
    return (
        <ul className="sign-top-menu">
            {ApiService.getSignItems().map(one => {
                return (
                   <li key={one[apiService.active]}>
                        <Link
                            to={one.action}
                            className={`${one.action} sign-top-menu-link`}
                        >{one[apiService.active]}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default TopBarSignItems;
