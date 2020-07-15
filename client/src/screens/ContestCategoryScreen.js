import React from 'react';
import { useParams } from 'react-router-dom';

const ContestCategoryScreen = (props) => {
    const { category_id } = useParams();
    return (
        <div>
            <p>Contest category {category_id}.</p>
        </div>
    );
};

export default ContestCategoryScreen;
