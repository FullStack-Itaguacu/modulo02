import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/notFound';
import {Category} from "../pages/category";

function PrivateRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Category />} />
      </Routes>
    </Router>
  )
}

export { PrivateRoutes }