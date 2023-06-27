import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main>
      <h1> 404 Página não encontrada!</h1>
      <Link to={-1}>Retornar a página anterior.</Link>
    </main>
  );
}

export { NotFound };
