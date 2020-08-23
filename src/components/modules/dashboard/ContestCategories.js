import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ApiService } from 'services/api.service';

const ContestCategories = () => {
    const { categories } = useSelector(({ contests }) => contests);
    const [categoriesActive, setCategories] = useState(false);
    const needToDisplayCategories = categoriesActive && categories.length > 0;

    const toggleCategories = () => setCategories(!categoriesActive);

    return (
        <div className="contest-categories-nav">
            <ul className="contest-categories-nav-links">
                {ApiService.getContestItemLinks().map(one => {
                    return (
                        <li className="nav-link-container" key={one.action}>
                            {one.action ?
                                <Link className="nav-link" to={one.action}>{one.en}</Link> :
                                <button className="btn-link nav-link" onClick={toggleCategories}>{one.en}</button>
                            }
                        </li>
                    );
                })}
            </ul>
            {needToDisplayCategories && <ul className="contest-categories-items">
                {categories.map(one => {
                    return (
                        <li className="nav-link-container" key={one.name}>
                            <Link className="nav-link" to={`/contest-categories/${one.category_id}`}>{one.name}</Link>
                        </li>
                    );
                })}
            </ul>}
        </div>
    );
};

export default ContestCategories;
