import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Message } from 'semantic-ui-react';
import axios from 'axios';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [taskDetails, setTaskDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('localhost:8080/tasks/allTasks');
                setTasks(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching tasks');
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        try {
            await axios.post('localhost:8080/tasks/newTask', taskDetails);
            setMessage('Task added successfully');
            setOpen(false);
            const response = await axios.get('localhost:8080/tasks/allTasks');
            setTasks(response.data);
        } catch (error) {
            setError('Error adding task');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            {error && <Message negative>{error}</Message>}
            {message && <Message positive>{message}</Message>}
            <Button primary onClick={() => setOpen(true)}>Add Task</Button>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Task ID</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Due Date</Table.HeaderCell>
                        <Table.HeaderCell>Priority</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tasks.map(task => (
                        <Table.Row key={task.taskId}>
                            <Table.Cell>{task.taskId}</Table.Cell>
                            <Table.Cell>{task.title}</Table.Cell>
                            <Table.Cell>{task.description}</Table.Cell>
                            <Table.Cell>{task.dueDate}</Table.Cell>
                            <Table.Cell>{task.priority}</Table.Cell>
                            <Table.Cell>{task.status}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header>Add New Task</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            label="Title"
                            onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
                        />
                        <Form.TextArea
                            label="Description"
                            onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
                        />
                        <Form.Input
                            label="Due Date"
                            type="date"
                            onChange={(e) => setTaskDetails({ ...taskDetails, dueDate: e.target.value })}
                        />
                        <Form.Input
                            label="Priority"
                            onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}
                        />
                        <Form.Select
                            label="Status"
                            options={[
                                { key: 'pending', text: 'Pending', value: 'Pending' },
                                { key: 'completed', text: 'Completed', value: 'Completed' },
                            ]}
                            onChange={(e, { value }) => setTaskDetails({ ...taskDetails, status: value })}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={handleAddTask}>Add Task</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default Tasks;
