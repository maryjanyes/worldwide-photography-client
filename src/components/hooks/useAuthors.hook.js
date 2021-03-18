import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

const useAuthors = (authorID) => {
    const { siteUsers } = useSelector(({ users }) => users);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        if (siteUsers?.length) {
            setAuthor(siteUsers.find(user => user.user_id === authorID));
        }
    }, [siteUsers, authorID]);

    return { author };
}

export default useAuthors;
