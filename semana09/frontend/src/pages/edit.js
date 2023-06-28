import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useParams } from 'react-router-dom';
import { api } from "../services/api";

function Edit() {
  const { id } = useParams()
  const [name, setName] = useState('')

  useEffect(() => {
    const load = async () => {
      const response = await api.get(`/api/listOneCategory/${id}`)
      setName(response.data.name)
    } 
    load()
  }, [id])

  return (
    <main>
      <Header />
      <p style={{textAlign: "center", fontSize: 36, fontWeight: "bold"}}>
        Editar categoria.
      </p>
      <form style={{
        display: "flex",
        flexDirection: "column",
        width: '100%',
        alignItems: 'center'
      }}>
        <input 
        placeholder="Nome" 
        value={name}
        />
      </form>
    </main>
  );
}

export { Edit };
