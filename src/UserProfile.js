import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Message } from 'semantic-ui-react';
import axios from 'axios';

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('localhost:8080/userProfile');
                setUserDetails(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateData = async () => {
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            await axios.put('localhost:8080/updateUser', {
                userId: userDetails.userId,
                name: userDetails.name,
                password: userDetails.password
                });
            setMessage('User Data updated successfully');
            setError(null);
        } catch (error) {
            setError('Error updating password');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <><Container style={{ marginTop: '3em' }}>
            {error && <Message negative>{error}</Message>}
            {message && <Message positive>{message}</Message>}
            <Form>
            <Form.Input
                    label="UserId"
                    value={userDetails.userId || ''}
                    readOnly
                />
                <Form.Input
                    label="Name"
                    value={userDetails.name || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                />
                <Form.Input
                    label="Old Password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <Form.Input
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Form.Input
                    label="Confirm New Password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <Button primary onClick={handleUpdateData}>Update My Data</Button>
            </Form></Container>
        </>
    );
};

export default UserProfile;
