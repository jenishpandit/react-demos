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
        
        
          <NavLink  className='nav-bar-links' to='/quizapp'>
            Quiz App
          </NavLink>
        
          <NavLink  className='nav-bar-links' to='/products'>
            React Query
          </NavLink>

          <NavLink className='nav-bar-links' to='/password'>
            Password Genrate
          </NavLink>
          <NavLink className='nav-bar-links' to='/typing'>
            Typing Speed
          </NavLink>
          <NavLink className='nav-bar-links' to='/shorturl'>
           Short Url
          </NavLink>
       
    </div>
    </div>
  );
}

export default Navbar;
