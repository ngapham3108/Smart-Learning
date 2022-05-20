import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

import ActionButton from './ActionButton';

const SinglePost = ({ post }) => {
    const { _id, url, description, status, title } = post;
    return (
        <Card
            className="shadow"
            border={
                status === 'LEARNED'
                    ? 'success'
                    : status === 'LEARNING'
                    ? 'warning'
                    : 'danger'
            }
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-tile">{title}</p>
                            <Badge
                                pill
                                bg={
                                    status === 'LEARNED'
                                        ? 'success'
                                        : status === 'LEARNING'
                                        ? 'warning'
                                        : 'danger'
                                }
                            >
                                {status}
                            </Badge>
                        </Col>
                        <Col className="text-end">
                            <ActionButton post={post}></ActionButton>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SinglePost;
