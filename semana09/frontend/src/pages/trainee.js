import { Header } from "../components/Header";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from "../services/api";

function Trainee() {
  const [trainees, setTrainees] = useState([])
  useEffect(() => {
    const load = async () => {
      const response = await api.get('/api/listTrainees')
      setTrainees(response.data)
    }
    load()
  }, [])

  return (
    <main>
      <Header />
      <h3 style={{ textAlign: 'center' }}>Estagiários</h3>

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
            }}>Email</th>
            <th style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Necessidades Especiais</th>
            <th style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Editar Registro</th>
            <th style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Deletar Registro</th>
          </tr>
          {
            trainees.map(({ id, name, haveSpecialNeeds, email }) => {
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
                  }}>{email}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: 8
                  }}>{haveSpecialNeeds ? "Sim" : "Não"}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: 8
                  }}><Link to={`/edit/${id}/Trainee`} >Editar</Link></td>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: 8
                  }}><button>Excluir</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </main>
  );
}

export { Trainee };
