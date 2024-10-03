import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Message } from 'semantic-ui-react';

const AddTask = ({ onClose, refreshTasks }) => {
  const [taskData, setTaskData] = useState({
    taskId: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const addTask = async () => {
    // Simple validation
    if (!taskData.title || !taskData.description) {
      setMessage('Title and Description are required');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
  
      // Check if token is available
      if (!token) {
        setMessage('No token found. Please log in again.');
        return;
      }
  
      await axios.post('http://localhost:8080/tasks/newTask', taskData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include 'Bearer' prefix
          'Content-Type': 'application/json' // Ensure content type is correct
        }
      });
  
      setMessage('Task added successfully');
      refreshTasks();
      onClose();
    } catch (error) {
      // If there's an error, extract the correct message from the error response
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'An error occurred while adding the task';
      setMessage(errorMessage);
    }
  };
  

  return (
    <div>
      <h2>Add New Task</h2>
      {message && <Message content={message} />}
      <Form>
        <Form.Field>
          <label>Task ID</label>
          <input type="text" name="taskId" value={taskData.taskId} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Title</label>
          <input type="text" name="title" value={taskData.title} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input type="text" name="description" value={taskData.description} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Due Date</label>
          <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Priority</label>
          <select name="priority" value={taskData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </Form.Field>
        <Button primary onClick={addTask}>Add Task</Button>
        <Button onClick={onClose}>Cancel</Button>
      </Form>
    </div>
  );
};

export default AddTask;
