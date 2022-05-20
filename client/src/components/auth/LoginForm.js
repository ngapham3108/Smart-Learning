import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
    const { loginUser } = React.useContext(AuthContext);

    const [loginForm, setLoginForm] = React.useState({
        username: '',
        password: '',
    });

    const [alert, setAlert] = React.useState(null);

    const onChangeLoginForm = (evt) =>
        setLoginForm({
            ...loginForm,
            [evt.target.name]: evt.target.value,
        });

    const login = async (evt) => {
        evt.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (!loginData.success) {
                setAlert({
                    type: 'danger',
                    message: loginData.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form onSubmit={login} onClick={() => setAlert(null)}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        value={loginForm.username}
                        required
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        value={loginForm.password}
                        required
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <div>
                <p>
                    Don't have an account?
                    <Link to="/register">
                        <Button size="sm" variant="info">
                            Sign up
                        </Button>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default LoginForm;
