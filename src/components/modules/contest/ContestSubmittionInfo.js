import React from 'react'
import { useSelector } from "react-redux";

import useAuthors from 'components/hooks/useAuthors.hook';
import { getTranslationStr } from "utils/data.util";

const ContestSubmittionInfo = ({ author_id, votes }) => {
    const { translations, activeLanguage } = useSelector(({ ui }) => ui);
    const { author } = useAuthors(author_id);

    return (
        <div className="contest-submittion__photo-info">
            {author_id && <p className="contest-submittion__author-name">
                <span>{translations[getTranslationStr('common.photo_author', activeLanguage)]}</span>
                <span>{author?.email}</span>
            </p>}
            <p className="contest-submittion__votes-count">
                <span>{translations[getTranslationStr('common.votes_count', activeLanguage)]}</span>
                <span>{votes}</span>
            </p>
        </div>
    )
}

export default ContestSubmittionInfo
