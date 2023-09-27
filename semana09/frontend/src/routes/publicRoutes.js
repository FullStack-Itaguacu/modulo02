import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/notFound';
import { Login } from '../pages/login';

function PublicRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export { PublicRoutes }