import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ApiService, apiService } from 'services/api.service';

const TopMenu = () => {
    const [opened, setOpened] = useState(false);
    const toggleMenu = () => setOpened(!opened);
    const menuItems = ApiService.getMenuItems();
    return (
        <div className="top-menu">
            <button className="menu-icon icon-btn" onClick={toggleMenu} />
            {opened && <ul className="top-menu-items">
                {
                    menuItems.length > 0 ? menuItems
                        .map(one => <li className="top-menu-item" key={one[apiService.active]}>
                            <Link to={one[apiService.active].toLowerCase()}>{one[apiService.active]}</Link>
                        </li>
                    ) : <p>No available links.</p>
                }
            </ul>}
        </div>
    );
};

export default TopMenu;
