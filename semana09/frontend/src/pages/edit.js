import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from "../services/api";
import { fieldsCategory, fieldsContract, fieldsTrainee } from "../utils/constants"
import { isBoolean } from "../utils/functions";

function Edit() {
  const { id, page } = useParams()
  const [form, setForm] = useState({})
  const navigate = useNavigate();

  const fields = {
    Category: fieldsCategory,
    Trainee: fieldsTrainee,
    Contract: fieldsContract
  }

  useEffect(() => {
    const load = async () => {
      const response = await api.get(`/api/listOne${page}/${id}`)
      setForm(response.data)
    }
    load()
  }, [id, page])

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    await api.patch(`/api/updateOne${page}/${id}`, {
      ...form
    })
    navigate(-1)
  }

  return (
    <main>
      <Header />
      <p style={{ textAlign: "center", fontSize: 36, fontWeight: "bold" }}>
        Editar {page}.
      </p>
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: '100%',
          alignItems: 'center'
        }}>
        {
          Object.keys(form)
            .filter((field) => fields[page][field].visible === true)
            .map((field) => {
              if (isBoolean(form[field])) {
                return (
                  <select
                    key={field} defaultValue={form[field] ? "Sim" : "Não"}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        [field]: event.target.value === "Sim"
                      })
                    }}
                  >
                    <option>Sim</option>
                    <option>Não</option>
                  </select>
                )
              }
              return (
                <input
                  key={field}
                  placeholder={form[field]}
                  value={form[field]}
                  onChange={(event) => {
                    setForm({
                      ...form,
                      [field]: event.target.value
                    })
                  }}
                />
              )
            })
        }
        <input
          style={{ margin: 10 }}
          value="Salvar alterações"
          type="submit"
        />
        <Link to={-1}>Retornar a página anterior.</Link>
      </form>
    </main>
  );
}

export { Edit };