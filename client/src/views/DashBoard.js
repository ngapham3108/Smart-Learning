import React from 'react';
import {
    Spinner,
    Card,
    Button,
    Col,
    Row,
    OverlayTrigger,
    Tooltip,
    Toast,
} from 'react-bootstrap';

import { PostsContext } from '../contexts/PostsContext';
import { AuthContext } from '../contexts/AuthContext';
import SinglePost from '../components/post/SinglePost';
import AddPostModal from '../components/post/AddPostModal';
import EditPostModal from '../components/post/EditPostModal';
import addIcon from './../assets/plus-circle-fill.svg';

const DashBoard = () => {
    let body;

    const {
        getPosts,
        postsState: { postsLoading, posts },
        setShowAddPostModal,
        showToast,
    } = React.useContext(PostsContext);

    const {
        authState: { user },
    } = React.useContext(AuthContext);

    if (postsLoading) {
        body = (
            <div className="spiner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">{`Hi ${user.username}`}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome To Smart Learning</Card.Title>
                        <Card.Text>
                            Click the button to add your first course
                        </Card.Text>
                        <Button
                            onClick={() => setShowAddPostModal(true)}
                            variant="primary"
                        >
                            Add New Course
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 mx-auto">
                    {posts.map((item) => {
                        return (
                            <Col key={item._id} className="my-2">
                                <SinglePost post={item} />
                            </Col>
                        );
                    })}
                </Row>
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip>Add New Course</Tooltip>}
                >
                    <Button className="btn-floating">
                        <img
                            src={addIcon}
                            alt="Add New Course"
                            width="50"
                            height="50"
                            onClick={() => setShowAddPostModal(true)}
                        ></img>
                    </Button>
                </OverlayTrigger>
            </>
        );
    }

    React.useEffect(() => {
        getPosts();
    }, []);
    return (
        <>
            {body}
            <AddPostModal />
            <EditPostModal />
            <Toast
                show={showToast.show}
                style={{ position: 'fixed', top: '5%', right: '20px' }}
                className={`bg-${showToast.type} text-white`}
            >
                <Toast.Body>
                    <strong>{showToast.message}</strong>
                </Toast.Body>
            </Toast>
        </>
    );
};

export default DashBoard;
