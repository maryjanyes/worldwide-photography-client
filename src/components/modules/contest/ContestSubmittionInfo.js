import React from 'react'
import { useSelector } from "react-redux";

import { getTranslationStr } from "utils/data.util";

const ContestSubmittionInfo = ({ author, votes }) => {
  const { translations, activeLanguage } = useSelector(({ ui }) => ui);

    return (
        <div className="contest-submittion__photo-info">
            {author && <p className="contest-submittion__author-name">
                <span>{translations[getTranslationStr('common.photo_author', activeLanguage)]}</span>
                <span>{author?.first_name || author?.email}</span>
            </p>}
            <p className="contest-submittion__votes-count">
                <span>{translations[getTranslationStr('common.votes_count', activeLanguage)]}</span>
                <span>{votes}</span>
            </p>
        </div>
    )
}

export default ContestSubmittionInfo
