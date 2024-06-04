import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { UserContextProvider } from '../../context/UserContext';
const NavBarWrapper = () => {
  return (
    <>
      <NavBar />
      <UserContextProvider>
        <Outlet />
      </UserContextProvider>
    </>
  );
};
export default NavBarWrapper;
