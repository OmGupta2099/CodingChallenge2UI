import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import Tasks from './Tasks';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const App = () => {
    return (
        <Router>
            <Routes> 
              <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
