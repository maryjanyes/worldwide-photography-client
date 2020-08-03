export const mergeContestsWithPhotos = (contestID, submittions, photos) => {
    const contestSubmittions = submittions.filter(s => s.contest_id == contestID);
    return contestSubmittions.map(s => photos.find(p => p.photo_id == s.photo_id));
};

export const getAnnouncements = (contestID, announcements) => {
    return announcements.filter(a => a.contest_id ==  contestID);
};

export const getContestJudle = (contestID, judles) => judles.find(one => one.contest_id === contestID);
