import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import BuildRoutes from './routes/routeConfig';
import AppLayout from './components/AppLayout';

const App = () => {
  const routes = BuildRoutes();

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/characters" replace />} />
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
