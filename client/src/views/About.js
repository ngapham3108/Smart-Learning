import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import style from './About.module.css';

const About = () => {
    return (
        <div className={style.useBackGround}>
            <div className="dark-overlay">
                <Container fluid>
                    <Row className="justify-content-md-center">
                        <Col
                            xs="6"
                            className={`text-white text-break ${style.innerContent}`}
                        >
                            <p>
                                This web application is used to manage your
                                learning courses.
                            </p>
                            <p>
                                I built it to practice my full-stack web
                                application skills.
                            </p>
                            <p>
                                If you are interested in the source code, click
                                here
                                <Button
                                    variant="info"
                                    href="https://github.com/ngapham3108/Smart-Learning"
                                    style={{ marginLeft: 10 }}
                                    target="_blank"
                                >
                                    To My GitHub
                                </Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default About;
