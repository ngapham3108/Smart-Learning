import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AlertMessage from '../layout/AlertMessage';
import { AuthContext } from '../../contexts/AuthContext';

const RegisterForm = () => {
    const { registerUser } = React.useContext(AuthContext);

    const [registerForm, setRegisterForm] = React.useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [alert, setAlert] = React.useState(null);

    const onChangeRegisterForm = (evt) =>
        setRegisterForm({
            ...registerForm,
            [evt.target.name]: evt.target.value,
        });

    const register = async (evt) => {
        evt.preventDefault();
        if (registerForm.password !== registerForm.confirmPassword) {
            setAlert({
                type: 'warning',
                message: 'Confirm password does not match',
            });
            return;
        }
        try {
            const registerData = await registerUser({
                username: registerForm.username,
                password: registerForm.password,
            });
            if (!registerData.success) {
                setAlert({
                    type: 'danger',
                    message: registerData.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form onClick={() => setAlert(null)} onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        value={registerForm.username}
                        onChange={onChangeRegisterForm}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        value={registerForm.password}
                        onChange={onChangeRegisterForm}
                        required
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                >
                    <Form.Control
                        type="password"
                        placeholder="confirm password"
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={onChangeRegisterForm}
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <div>
                <p>
                    Already have an account?
                    <Link to="/login">
                        <Button size="sm" variant="info">
                            Sign in
                        </Button>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default RegisterForm;
