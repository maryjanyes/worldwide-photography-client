const initialState = {
    allArticles: [{
        article_id: '90000',
        tags: [],
        created_at: Date.now(),
        title: 'My article',
        author: 'Marianna Yasko',
        content: 'This is the test article.',
        description: 'Lorem ispum dolor. Lorem ispum dolor. Lorem ispum dolor. Lorem ispum dolor.'
    }, {
        article_id: '90000',
        tags: [],
        created_at: Date.now(),
        title: 'My article',
        author: 'Marianna Yasko',
        content: 'This is the test article.',
        description: 'Lorem ispum dolor. Lorem ispum dolor. Lorem ispum dolor. Lorem ispum dolor.'
    }],
};

export default function ArticlesReducer(state = initialState, { payload, type }) {
    switch(type) {
        case 'SET_ARTICLES': {
            return {
                ...state,
                allArticles: payload,
            };
        }
        default: return state;
    }
}
