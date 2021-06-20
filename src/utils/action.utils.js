import photosService from "../services/photos.service";

export const votePhoto = async (submittion_id, refreshSubmittions) => {
    try {
        const voteResponse = await photosService.voteImageOrSubmittion(submittion_id);

        if (voteResponse.isSuccess && refreshSubmittions) {
            refreshSubmittions();
        }
    } catch(err) { }
};
