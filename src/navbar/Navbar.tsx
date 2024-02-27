import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FileTextOutlined, LaptopOutlined, LinkOutlined, LockOutlined, MenuFoldOutlined, MenuUnfoldOutlined, OpenAIOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const routes = [
    {
      name: "Todo App",
      path: "/",
      icon: <UnorderedListOutlined />
    },
    {
      name: "Quiz App",
      path: "quizapp",
      icon: <QuestionCircleOutlined />
    },
    {
      name: "Password Generate",
      path: "password",
      icon: <LockOutlined/>
    },
    {
      name: "Typing Speed",
      path: "typing",
      icon: <LaptopOutlined/>
    },
    {
      name: "Short Url",
      path: "shorturl",
      icon: <LinkOutlined />
    },
    
    {
      name: "Embad Link",
      path: "embadlink",
      icon: <FileTextOutlined />
    },
     
  ]

  return (
    <div className={`${isSidebarOpen ? "w-14" :"w-64"} h-full bg-sky-950  text-white transition-all duration-400 ease-out `} >
      <div className='flex justify-between p-4 items-center gap-10'>
        {!isSidebarOpen && <span className='font-bold text-xl uppercase ' >Projects</span>}
        <div onClick={toggleSidebar}>
        {isSidebarOpen ? 
        <MenuFoldOutlined className='text-xl cursor-pointer '/> : 
        <MenuUnfoldOutlined className='text-xl cursor-pointer '/>}
        </div>
      </div>
      <div className='navbar'>
        {routes.map(({icon, name, path}) => (
          <NavLink className="flex items-center gap-2 px-4 py-2" key={name}  to={path} >
            <span className='mb-2'>{icon}</span>
            {!isSidebarOpen && <span>{name}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
