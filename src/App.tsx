// project import
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
import { useEffect, useState } from 'react';
import { GetCookies } from 'utils/cookiesHelper';

// zustand user

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (GetCookies('uid')) {
      // get user data from db
    } else {
      `http://localhost:5173/holly-react/`;
    }
  }, []);

  return (
    isAuth && (
      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
    )
  );
};

export default App;
