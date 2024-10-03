import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Header, Button, List, Modal, Segment, Confirm } from 'semantic-ui-react';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:8080/tasks/allTasks', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data || error.message);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, token]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      await axios.delete(`http://localhost:8080/tasks/deleteTask?taskId=${selectedTask.taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      fetchTasks();
      setConfirmOpen(false);
      setModalOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error.response?.data || error.message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
    setIsUpdateMode(false);
  };

  const openUpdateModal = () => {
    setIsUpdateMode(true);
  };

  const getColorForStatus = (status) => {
    switch (status) {
      case 'Pending':
        return 'red';
      case 'In_Progress':
        return 'yellow';
      case 'Completed':
      default:
        return 'green';
    }
  };

  return (
    <Container>
      <Header as='h1' textAlign='center' style={{ marginTop: '2em' }}>Dashboard</Header>
      <Button primary onClick={() => { setSelectedTask(null); setIsUpdateMode(false); setModalOpen(true); }}>
        Add New Task
      </Button>

      <Header as='h3'>Existing Tasks</Header>
      <List divided relaxed>
        {tasks.map((task) => (
          <List.Item key={task.taskId}>
            <Segment color={getColorForStatus(task.status)}>
              <span onClick={() => handleTaskClick(task)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {task.title} - {task.dueDate}
              </span>
            </Segment>
          </List.Item>
        ))}
      </List>

      <Modal open={modalOpen && !isUpdateMode} onClose={closeModal}>
        {selectedTask && (
          <>
            <Modal.Header>Task Details</Modal.Header>
            <Modal.Content>
              <p><strong>Title:</strong> {selectedTask.title}</p>
              <p><strong>Description:</strong> {selectedTask.description}</p>
              <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
              <p><strong>Status:</strong> {selectedTask.status}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => openUpdateModal()}>Update Task</Button>
              <Button negative onClick={() => setConfirmOpen(true)}>Delete Task</Button>
            </Modal.Actions>
          </>
        )}
      </Modal>

      <Modal open={isUpdateMode} onClose={closeModal}>
        {selectedTask && (
          <UpdateTask
            task={selectedTask}
            onClose={() => { closeModal(); fetchTasks(); }}
            refreshTasks={fetchTasks}
          />
        )}
      </Modal>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteTask}
        content="Are you sure you want to delete this task?"
      />

      <Modal open={modalOpen && !selectedTask && !isUpdateMode} onClose={closeModal}>
        <AddTask onClose={closeModal} refreshTasks={fetchTasks} />
      </Modal>
    </Container>
  );
};

export default Dashboard;
