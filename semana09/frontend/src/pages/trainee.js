import { Header } from "../components/Header";
import { useEffect, useState } from 'react'
import { api } from "../services/api";
import { Table } from "../components/Table";
import { Modal } from "../components/Modal";

function Trainee() {
  const [trainees, setTrainees] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [changeState, setChangeState] = useState(true)
  const [form, setForm] = useState({})

  const fields = [
    { key: "name", placeholder: "Nome", isRequired: true, type: "text" },
    { key: "email", placeholder: "Email", isRequired: true, type: "email" },
    { key: "rg", placeholder: "RG", isRequired: true, type: "number" },
    { key: "cpf", placeholder: "CPF", isRequired: true, type: "number" },
    { key: "primaryPhoneContact", placeholder: "Telefone Celular", isRequired: true, type: "tel" },
    { key: "secondaryPhoneContact", placeholder: "Outro telefone", isRequired: false, type: "tel" },
    { key: "dateBirth", placeholder: "Data de Nascimento", isRequired: true, type: "date" },
    { key: "fatherName", placeholder: "Nome do Pai", isRequired: true, type: "text" },
    { key: "motherName", placeholder: "Nome da Mãe", isRequired: true, type: "text" },
    { key: "haveSpecialNeeds", placeholder: "Tem necessidades especiais?", isRequired: true, type: "select", list: [{ key: true, label: "Sim" }, { key: false, label: "Não" }] },
  ]

  useEffect(() => {
    const load = async () => {
      const response = await api.get('/api/listTrainees')
      setTrainees(response.data)
    }
    load()
  }, [changeState])

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      await api.post('/api/createOneTrainee', form);
      alert("Criado com sucesso.")
      setChangeState(!changeState)
      setShowModal(false)
    } catch (error) {
      console.log(error)
      alert(`${error.response.data.message}\nCausa: ${error.response.data.cause}`)
    }
  }

  const deleteOneTrainee = async (id) => {
    try {
      await api.delete(`/api/deleteOneTrainee/${id}`);
      alert("Estagiário deletado com sucesso.")
      setChangeState(!changeState)
    } catch (error) {
      console.log(error.message)
      alert(`Não foi possível excluir \nCausa: ${error.message}`)

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
        <p>Estagiários</p>
        <button onClick={() => setShowModal(true)}>Criar novo estagiário</button>
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
        trainees && (
          <Table
            list={trainees}
            page="Trainee"
            fieldsTable={["id", "name", "primaryPhoneContact", "secondaryPhoneContact", "haveSpecialNeeds"]}
            deleteFuncion={deleteOneTrainee}
          />
        )
      }
    </main>
  );
}

export { Trainee };
