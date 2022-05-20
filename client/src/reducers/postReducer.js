export const postReducer = (state, action) => {
    const { type, payload } = action;
    let newPosts;

    switch (type) {
        case 'LOADED_POSTS':
            return {
                ...state,
                posts: payload,
                postsLoading: false,
            };
        case 'FAILED_LOADED':
            return {
                ...state,
                posts: [],
                postsLoading: false,
            };
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, payload],
            };
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload._id),
            };
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id !== payload._id ? post : payload,
                ),
            };
        default:
            return state;
    }
};
