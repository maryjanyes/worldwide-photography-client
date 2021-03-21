import React from 'react'
import { useSelector } from "react-redux";

import { getTranslationStr } from "utils/data.util";

const ContestSubmittionInfo = ({ author, votes, description }) => {
    const { translations, activeLanguage } = useSelector(({ ui }) => ui);

    return (
        <div className="contest-submittion__photo-info">
            {author && <p className="contest-submittion__author-name contest-submittion__info-block">
                <span>{translations[getTranslationStr('common.photo_author', activeLanguage)]}</span>
                <span>{author?.email}</span>
            </p>}
            <p className="contest-submittion__votes-count contest-submittion__info-block">
                <span>{translations[getTranslationStr('common.votes_count', activeLanguage)]}</span>
                <span>{votes}</span>
            </p>
            <p className="contest-submittion__comment contest-submittion__info-block">
                <span>Author commented</span>
                <span>{description}</span>
            </p>
        </div>
    )
}

export default ContestSubmittionInfo
