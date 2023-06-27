import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { api } from '../services/api';

function Category() {
  const [categories, setCategories] = useState([])
  const [changeState, setChangeState] = useState(true)
  const [form, setForm] = useState({})

  useEffect(() => {
    const load = async () => {
      const response = await api.get('/api/listCategories')
      setCategories(response.data)
    }
    load()
  }, [changeState])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await api.post('/api/createOneCategory', form);
    alert("Criado com sucesso.")
    setChangeState(!changeState)
  }

  return (
    <main>
      <Header />
      <h3 style={{ textAlign: 'center' }}>Categorias</h3>

      <form
        onSubmit={onSubmitHandler} 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', justifyItems: 'center', padding: 8 }}>
        <input
          id="name"
          type="text"
          placeholder="Nome da categoria"
          onChange={(event) => {
            setForm({
              ...form,
              name: event.target.value
            })
          }} />
        <input
          type="submit"
          value="Criar nova categoria."
        />
      </form>

      <table style={{
        fontFamily: 'arial, sans-serif',
        borderCollapse: 'collapse',
        width: '100%',
      }}>
        <tbody style={{
          border: '1px solid #dddddd',
          textAlign: 'left',
          padding: 8
        }}>
          <tr style={{
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: 8
          }}>
            <th style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Id</th>
            <th style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Nome</th>
            <th style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Criado em</th>
            <th style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Atualizado em</th>
          </tr>
          {
            categories.map(({ id, name, createdAt, updatedAt }) => {
              return (
                <tr key={id}>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: 8
                  }}>{id}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: 8
                  }}>{name}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: 8
                  }}>{createdAt}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: 8
                  }}>{updatedAt}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </main >
  );
}

export { Category };
