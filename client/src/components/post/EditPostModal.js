import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { PostsContext } from '../../contexts/PostsContext';

const EditPostModal = () => {
    const { setEditPostData, editPostData, setShowToast, editPost } =
        React.useContext(PostsContext);

    const onCloseModal = () => {
        setEditPostData({
            _id: '',
            title: '',
            url: '',
            description: '',
            status: 'TO LEARN',
            show: false,
        });
    };

    const onChange = (evt) => {
        setEditPostData({
            ...editPostData,
            [evt.target.name]: evt.target.value,
        });
    };

    const onSubmit = async (evt) => {
        evt.preventDefault();
        const { success, message } = await editPost(editPostData._id, {
            title: editPostData.title,
            status: editPostData.status,
            description: editPostData.description,
            url: editPostData.url,
        });
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
        <Modal show={editPostData.show}>
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
                            value={editPostData.title}
                            required
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            name="description"
                            value={editPostData.description}
                            rows={5}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            value={editPostData.url}
                            name="url"
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select
                            defaultValue={editPostData.status}
                            onChange={onChange}
                            name="status"
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Select>
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

export default EditPostModal;
