import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stores from './pages/Stores';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stores" element={<Stores />} />
    </Routes>
  );
};

export default AppRoutes;
