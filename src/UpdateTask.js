import React, { useState, useEffect, useNavigate } from 'react';
import axios from 'axios';
import { Form, Button, Message } from 'semantic-ui-react';

const UpdateTask = ({ task, onClose, refreshTasks }) => {
  const [taskData, setTaskData] = useState({
    taskId: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
  });
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (task) {
      setTaskData({
        taskId: task.taskId,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const updateTask = async () => {
    try {
      const response = await axios.put('http://localhost:8080/tasks/updateTask', taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage(response.data);
      refreshTasks();
      onClose();
    } catch (error) {
      setMessage(error.response?.data || 'Error updating task');
    }
  };

  return (
    <div>
      <h2>Update Task</h2>
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
        <Form.Field>
          <label>Status</label>
          <select name="status" value={taskData.status} onChange={handleChange}>
            <option value="Completed">Completed</option>
            <option value="In_Progress">In_Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </Form.Field>
        <Button primary onClick={updateTask}>Update Task</Button>
        <Button onClick={onClose}>Cancel</Button>
      </Form>
    </div>
  );
};

export default UpdateTask;
