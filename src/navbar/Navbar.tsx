import { NavLink } from 'react-router-dom';


function Navbar() {
  return (
    <div className="navbar-container">
      <div className='navbar'>
      
          {/* <NavLink className='nav-bar-links' to='/'>
            Home
          </NavLink> */}
       
        
          <NavLink className='nav-bar-links' to='/todo'>
            Todo App
          </NavLink>
        
        
          <NavLink className='nav-bar-links' to='/quizapp'>
            Quiz App
          </NavLink>
        
          <NavLink className='nav-bar-links' to='/products'>
            React Query
          </NavLink>

          <NavLink className='nav-bar-links' to='/password'>
            PasswordGenrate
          </NavLink>
          <NavLink className='nav-bar-links' to='/typing'>
            TypingSpeed
          </NavLink>
       
    </div>
    </div>
  );
}

export default Navbar;
