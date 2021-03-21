import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

const useAuthors = () => {
    const { siteUsers } = useSelector(({ users }) => users);
    const [author, setAuthor] = useState(null);
    const [photo, setPhotoForHook] = useState(null);

    useEffect(() => {
        if (siteUsers?.length && photo) {
            setAuthor(siteUsers.find(user => user.user_id === photo.author_id));
        }
    }, [siteUsers, photo]);

    return { author, setPhotoForHook };
}

export default useAuthors;
