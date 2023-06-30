import { Link } from 'react-router-dom'
import { isBoolean } from '../../utils/functions'

function Table({ list, page, fieldsTable, deleteFuncion }) {
  return (
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
          {
            fieldsTable.map((key) => {
              return (
                <th
                  key={key}

                  style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: 8
                  }}>{key}</th>
              )
            })
          }
          <th
            style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Change</th>
          <th
            style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Delete</th>
        </tr>
        {
          list.map((fields) => {
            return (
              <tr key={fields.id}>
                {
                  fieldsTable.map((key) => {
                    return (
                      <td
                        key={key}
                        style={{
                          border: '1px solid #dddddd',
                          textAlign: 'left',
                          padding: 8
                        }}
                      >
                        {
                          isBoolean(fields[key]) ?
                            fields[key] ? "Sim" : "Não"
                            : fields?.[key]
                        }
                      </td>
                    )
                  })
                }

                <td style={{
                  border: '1px solid #dddddd',
                  textAlign: 'left',
                  padding: 8
                }}><Link to={`/edit/${fields.id}/${page}`} >Editar</Link></td>
                <td style={{
                  border: '1px solid #dddddd',
                  textAlign: 'left',
                  padding: 8
                }}><button onClick={() => deleteFuncion(fields.id)}>Excluir</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export { Table }