import { Link } from 'react-router-dom'
import {useAuth} from "../../hooks/useAuth"
function Header() {

  const {logout} = useAuth()

  return (
    <header style={{
      height: 100,
      backgroundColor: 'grey'
    }}>
      <nav style={{
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
      }}>
        <Link
          style={{
            textDecoration: "None",
            color: "white",
            borderColor: "white",
            borderWidth: 2,
            borderStyle: 'solid',
            padding: 8,
            borderRadius: 8
          }} to="/"
        >Categorias</Link>
        <Link style={{
          textDecoration: "None",
          color: "white",
          borderColor: "white",
          borderWidth: 2,
          borderStyle: 'solid',
          padding: 8,
          borderRadius: 8
        }} to="/trainees">Estagiários</Link>
        <Link style={{
          textDecoration: "None",
          color: "white",
          borderColor: "white",
          borderWidth: 2,
          borderStyle: 'solid',
          padding: 8,
          borderRadius: 8
        }} to="/contracts">Contratos</Link>
        <Link style={{
          textDecoration: "None",
          color: "white",
          borderColor: "white",
          borderWidth: 2,
          borderStyle: 'solid',
          padding: 8,
          borderRadius: 8
        }} to="/companies">Empresas</Link>
        <Link style={{
          textDecoration: "None",
          color: "white",
          borderColor: "white",
          borderWidth: 2,
          borderStyle: 'solid',
          padding: 8,
          borderRadius: 8
        }} onClick={logout} to="/">Logout</Link>
      </nav>
    </header>
  );
}

export { Header };
