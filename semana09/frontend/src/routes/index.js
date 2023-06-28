import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Category } from '../pages/category';
import { NotFound } from '../pages/notFound';
import { Contract } from '../pages/contracts';
import { Company } from '../pages/company';
import { Trainee } from '../pages/trainee';
import { Edit } from '../pages/edit';

function PublicRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Category />} />
        <Route path="/contracts" element={<Contract />} />
        <Route path="/companies" element={<Company />} />
        <Route path="/trainees" element={<Trainee />} />
        <Route path="/edit/:id/:page" element={<Edit />} />
      </Routes>
    </Router>
  )
}

export { PublicRoutes }