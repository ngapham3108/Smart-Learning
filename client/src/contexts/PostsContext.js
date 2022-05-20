import { createContext, useReducer, useState } from 'react';
import axios from 'axios';

import { postReducer } from '../reducers/postReducer';
import { apiUrl } from './constant';

const PostsContext = createContext();

const PostsContextProvider = ({ children }) => {
    const [postsState, dispatch] = useReducer(postReducer, {
        postsLoading: true,
        posts: [],
    });

    const [showAddPostModal, setShowAddPostModal] = useState(false);

    const [editPostData, setEditPostData] = useState({
        _id: '',
        title: '',
        status: 'TO LEARN',
        description: '',
        url: '',
        show: false,
    });

    const [showToast, setShowToast] = useState({
        type: '',
        message: '',
        show: false,
    });

    // Get Posts

    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                dispatch({
                    type: 'LOADED_POSTS',
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({
                type: 'FAILED_LOADED',
            });
            return { success: false, message: 'Internal Error' };
        }
    };

    // Create Post

    const addPost = async (PostForm) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, PostForm);
            if (response.data.success) {
                dispatch({
                    type: 'ADD_POST',
                    payload: response.data.post,
                });
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: 'Internal Error' };
        }
    };

    // Delete Post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (response.data.success) {
                dispatch({
                    type: 'DELETE_POST',
                    payload: response.data.post,
                });
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: 'Internal Error' };
        }
    };

    //Edit Post
    const editPost = async (postId, updateForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/posts/${postId}`,
                updateForm,
            );
            if (response.data.success) {
                dispatch({
                    type: 'UPDATE_POST',
                    payload: response.data.post,
                });
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: 'Internal Error' };
        }
    };

    const PostsContextData = {
        getPosts,
        addPost,
        deletePost,
        setEditPostData,
        postsState,
        editPostData,
        editPost,
        showAddPostModal,
        showToast,
        setShowAddPostModal,
        setShowToast,
    };

    return (
        <PostsContext.Provider value={PostsContextData}>
            {children}
        </PostsContext.Provider>
    );
};

export { PostsContext };

export default PostsContextProvider;
