import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { api } from '../services/api';
import { Table } from '../components/Table';

function Category() {
  const [categories, setCategories] = useState([])
  const [changeState, setChangeState] = useState(true)
  const [form, setForm] = useState({})

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/api/listCategories/0/5')
        setCategories(response.data.records)
      } catch (error) {
        console.log(error)
      }
    }
    load()
  }, [changeState])

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      await api.post('/api/createOneCategory', form);
      alert("Criado com sucesso.")
      setChangeState(!changeState)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }

  const deleteOneCategory = async (id) => {
    await api.delete(`/api/deleteOneCategory/${id}`);
    alert("Categoria deletada com sucesso.")
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

      {
        categories && (
          <Table
            list={categories}
            page={"Category"}
            fieldsTable={["id", "name", "createdAt", "updatedAt"]}
            deleteFuncion={deleteOneCategory}
          />)
      }
    </main >
  );
}

export { Category };
