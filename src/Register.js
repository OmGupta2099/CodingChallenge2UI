// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Message, Container, Header } from 'semantic-ui-react';

const Register = () => {
    const [userData, setUserData] = useState({
        userId: '',
        name: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Reset error message on change
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/register', {
                userId: userData.userId,
                name: userData.name,
                password: userData.password,
            });
            console.log('Registration successful:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    return (
        <Container text>
            <Header as='h2' textAlign='center' style={{ marginTop: '5em' }}>Register</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>User ID</label>
                    <input
                        type="text"
                        name="userId"
                        value={userData.userId}
                        onChange={handleChange}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Field>
                {errorMessage && (
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>{errorMessage}</p>
                    </Message>
                )}
                <Button primary type="submit">Register</Button>
            </Form>
        </Container>
    );
};

export default Register;
