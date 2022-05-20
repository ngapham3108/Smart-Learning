import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { PostsContext } from '../../contexts/PostsContext';

const AddPostModal = () => {
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
        React.useContext(PostsContext);

    const [newPost, setNewPost] = React.useState({
        title: '',
        url: '',
        description: '',
        status: 'TO LEARN',
    });

    const onCloseModal = () => {
        setNewPost({
            title: '',
            url: '',
            description: '',
            status: 'TO LEARN',
        });
        setShowAddPostModal(false);
    };

    const onChange = (evt) => {
        setNewPost({
            ...newPost,
            [evt.target.name]: evt.target.value,
        });
    };

    const onSubmit = async (evt) => {
        evt.preventDefault();
        const { success, message } = await addPost(newPost);
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
        onCloseModal();
    };

    return (
        <Modal show={showAddPostModal}>
            <Modal.Header>
                <Modal.Title>Add Your New Course</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="my-2">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            value={newPost.title}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            name="description"
                            rows={5}
                            value={newPost.description}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            name="url"
                            value={newPost.url}
                            onChange={onChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCloseModal} variant="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModal;
