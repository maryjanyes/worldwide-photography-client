import React, { useState } from "react";

import { ApiService, apiService } from 'services/api.service';

const TopMenu = () => {
    const [opened, setOpened] = useState(false);
    const toggleMenu = () => setOpened(!opened);
    return (
        <div className="top-menu">
            <button className="menu-icon icon-btn" onClick={toggleMenu} />
            {opened && <ul className="top-menu-items">
                {
                    ApiService.getMenuItems()
                        .map(one => <li className="top-menu-item" key={one[apiService.active]}>
                            {one[apiService.active]}
                        </li>
                    )
                }
            </ul>}
        </div>
    );
};

export default TopMenu;
