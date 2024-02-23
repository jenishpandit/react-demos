import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CloseOutlined, LaptopOutlined, LinkOutlined, LockOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    
    <div className={`navbar-container ${isSidebarOpen ? 'open' : ''}`}>
      <div onClick={toggleSidebar}>
        {isSidebarOpen ? <CloseOutlined  className='toggle'/> :  <UnorderedListOutlined className='list'/>}
      </div>
      <div className='navbar'>
        <span className='text'>Nav Item</span>
        <NavLink className='nav-bar-links' to='/todo' >
        <UnorderedListOutlined className='nav-icon' /> Todo App
        </NavLink>
        <NavLink className='nav-bar-links' to='/quizapp' >
        <QuestionCircleOutlined className='nav-icon'/> Quiz App
        </NavLink>
        <NavLink className='nav-bar-links' to='/password' >
        <LockOutlined  className='nav-icon'/> Password Generate
        </NavLink>
        <NavLink className='nav-bar-links' to='/typing' >
        <LaptopOutlined  className='nav-icon'/> Typing Speed
        </NavLink>
        <NavLink className='nav-bar-links' to='/shorturl' >
        <LinkOutlined  className='nav-icon'/> Short Url
        </NavLink>
       
      </div>
    </div>
  );
}

export default Navbar;
