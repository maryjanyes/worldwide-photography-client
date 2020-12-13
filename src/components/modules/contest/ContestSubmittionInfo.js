import React from 'react'

const ContestSubmittionInfo = ({ author, votes }) => {
    return (
        <div className="contest-submittion__photo-info">
            {author && <p className="contest-submittion__author-name">
            Photo author {author?.first_name || author?.email}
            </p>}
            <p className="contest-submittion__votes-count">Votes count {votes}</p>
        </div>
    )
}

export default ContestSubmittionInfo
