import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import BuildRoutes from './routes/routeConfig';
import BuildNavigationLinks from './routes/buildNavigationLinks';
import AppLayout from './components/AppLayout';
import NavigationMenu from './components/NavigationMenu';

const App = () => {
  const routes = BuildRoutes();
  const navLinks = BuildNavigationLinks(routes);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout navigation={<NavigationMenu links={navLinks} />} />
          }
        >
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
