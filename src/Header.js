import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Menu>
      <Menu.Item as={Link} to="/">Login</Menu.Item>
      <Menu.Item as={Link} to="/profile">Profile</Menu.Item>
      <Menu.Item as={Link} to="/tasks">Tasks</Menu.Item>
    </Menu>
  );
};

export default Header;
