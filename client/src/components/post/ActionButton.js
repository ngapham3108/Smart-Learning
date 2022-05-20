import { Button } from 'react-bootstrap';
import React from 'react';

import playIcon from './../../assets/play-btn.svg';
import editIcon from './../../assets/pencil.svg';
import deleteIcon from './../../assets/trash.svg';
import { PostsContext } from '../../contexts/PostsContext';

const ActionButton = ({ post }) => {
    const { _id, url, description, status, title } = post;
    const { deletePost, setShowToast, setEditPostData } =
        React.useContext(PostsContext);

    const onDelete = async () => {
        if (!window.confirm('You are about to delete the course!')) {
            return;
        }
        const { success, message } = await deletePost(_id);
        setShowToast({
            type: success ? 'success' : 'danger',
            message: message,
            show: true,
        });
        setTimeout(() => {
            setShowToast({
                type: '',
                message: '',
                show: false,
            });
        }, 2000);
    };

    const onEdit = () => {
        setEditPostData({
            _id,
            title,
            url,
            status,
            description,
            show: true,
        });
    };

    return (
        <>
            <Button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="Play" width="32" height="32"></img>
            </Button>
            <Button className="post-button" onClick={onEdit}>
                <img src={editIcon} alt="Edit" width="24" height="24"></img>
            </Button>
            <Button className="post-button" onClick={onDelete}>
                <img src={deleteIcon} alt="Delete" width="24" height="24"></img>
            </Button>
        </>
    );
};

export default ActionButton;
