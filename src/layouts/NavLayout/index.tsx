import { Outlet } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';

function NavLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default NavLayout;
