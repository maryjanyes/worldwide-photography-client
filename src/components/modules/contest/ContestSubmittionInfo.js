import React from 'react'

const ContestSubmittionInfo = ({ author, votes }) => {
    return (
        <div className="contest-submittion__photo-info">
            {author && <p className="contest-submittion__author-name">
                <span>Photo author</span>
                <span>{author?.first_name || author?.email}</span>
            </p>}
            <p className="contest-submittion__votes-count">
                <span>Votes count</span>
                <span>{votes}</span>
            </p>
        </div>
    )
}

export default ContestSubmittionInfo
