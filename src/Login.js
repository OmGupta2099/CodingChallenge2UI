import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Form, Button, Message, Header } from 'semantic-ui-react';
const Login = () => {    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = await axios.post('http://localhost:8080/login', { username: userId, password: password });
            localStorage.setItem('token', token.data);
            navigate('/dashboard');
        } catch (error) {
            setError(error);
        }
    };
const handleRegister = () =>{
    navigate("/register");
}
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px' }}>
            <h2>Login</h2>
            {error && <Message negative>{error}</Message>}
            <Form onSubmit={handleLogin}>
                <Form.Input
                    label='User ID'
                    placeholder='Enter your user ID'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <Form.Input
                    type='password'
                    label='Password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button primary type='submit'>Login</Button>
                <Header>Don't have an account? Then</Header>
                <Button onClick={handleRegister}>Register</Button>
            </Form>
        </div>
    );
};

export default Login;
