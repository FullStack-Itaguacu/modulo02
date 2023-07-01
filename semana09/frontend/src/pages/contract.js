import { Header } from "../components/Header";
import { useEffect, useState } from 'react'
import { api } from "../services/api";
import { Table } from "../components/Table";
import { Modal } from "../components/Modal";

function Contract() {
  const [contracts, setContracts] = useState([])
  const [trainees, setTrainees] = useState([])
  const [companies, setCompanies] = useState([])
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [changeState, setChangeState] = useState(true)
  const [form, setForm] = useState({})

  const fields = [
    { key: "remuneration", placeholder: "Salário", isRequired: true, type: "number" },
    { key: "extra", placeholder: "Benefícios", isRequired: true, type: "number" },
    { key: "startValidity", placeholder: "Início do Contrato", isRequired: true, type: "date" },
    { key: "endValidity", placeholder: "Fim do Contrato", isRequired: true, type: "date" },
    { key: "status", placeholder: "Status do Contrato", isRequired: true, type: "select", list: [{ key: true, label: "Ativo" }, { key: false, label: "Inativo" }] },
    { key: "traineeId", placeholder: "Banco de dados estagiários", isRequired: true, type: "select", list: trainees },
    { key: "categoryId", placeholder: "Categorias", isRequired: true, type: "select", list: categories },
    { key: "companyId", placeholder: "Empresas", isRequired: true, type: "select", list: companies },
  ]

  useEffect(() => {
    const load = async () => {
      const response = await api.get('/api/listContracts')
      const responseTrainee = await api.get('/api/listTrainees')
      const responseCompany = await api.get('/api/listCompanies')
      const responseCategory = await api.get('/api/listCategories/0/10')

      const resultTrainee = responseTrainee.data.map(({name, id}) => {
        return {
          key: id, 
          label: name
        }
      })

      const resultCompany = responseCompany.data.map(({companyName, id}) => {
        return {
          key: id, 
          label: companyName
        }
      })

      const resultCategory = responseCategory.data.records.map(({name, id}) => {
        return {
          key: id, 
          label: name
        }
      })
      setContracts(response.data.records)
      setTrainees(resultTrainee)
      setCompanies(resultCompany)
      setCategories(resultCategory)
    }
    load()
  }, [changeState])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await api.post('/api/createOneContract', form);
    alert("Criado com sucesso.")
    setChangeState(!changeState)
    setShowModal(false)
  }

  const deleteOneContract = async (id) => {
    try {
      await api.delete(`/api/deleteOneContract/${id}`);
      alert("Contrato deletado com sucesso.")
      setChangeState(!changeState)
    } catch (error) {
      console.log(error.message)
      alert(`Não foi possível excluir! \nCausa: ${error.message}`)
    }
  }

  return (
    <main>
      <Header />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 8
      }}>
        <p>Contratos</p>
        <button onClick={() => setShowModal(true)}>Criar novo contrato</button>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <form
          onSubmit={onSubmitHandler}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: 8,
            width: '100%',
            justifyContent: 'space-between'
          }}>
          {
            fields.map(({ key, placeholder, isRequired, type, list }) => {
              return (
                <div
                  key={placeholder}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    width: '50%',

                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'start',
                      fontSize: 16
                    }}
                    htmlFor={key}
                  >
                    {placeholder}
                    {isRequired && (<span style={{ color: "red" }}>*</span>)}
                  </label>
                  {
                    type === 'select' ? (
                      <select
                        id={key}
                        style={{
                          height: 20,
                          width: 200,
                          borderRadius: 8,
                          margin: '8px 16px 8px 0',
                        }}
                        required={isRequired}
                        onChange={(event) => {
                          setForm({
                            ...form,
                            [key]: event.target.value
                          })
                        }}
                      >
                        <option value={""} disabled={!!form[key]}>Selecione uma opção</option>
                        {
                          list.reverse().map(({ key, label }) => {
                            return (
                              <option key={label} value={key}>{label}</option>
                            )
                          })
                        }
                      </select>
                    ) : (
                      <input
                        key={placeholder}
                        id={key}
                        name={key}
                        type={type}
                        required={isRequired}
                        placeholder={placeholder}
                        style={{
                          height: 20,
                          width: 200,
                          borderRadius: 8,
                          margin: '8px 16px 8px 0',
                        }}
                        onChange={(event) => {
                          setForm({
                            ...form,
                            [key]: event.target.value
                          })
                        }}
                      />
                    )
                  }
                </div>
              )
            })
          }

          <input
            type="submit"
            value="Salvar cadastro."
          />
        </form>
      </Modal>
      {
        contracts && (
          <Table
            list={contracts}
            page="Contract"
            fieldsTable={[
              "id", 
              "traineeName",
              "primaryPhoneContact",
              "companyName", 
              "supervisorName",
              "categoryName"
            ]}
            deleteFuncion={deleteOneContract}
          />
        )
      }
    </main>
  );
}

export { Contract };