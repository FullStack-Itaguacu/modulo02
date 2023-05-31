import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [lista, setLista] = useState([])
  const [atualizarLista, setAtualizarLista] = useState(false)

  useEffect(() => {
    const carregar = async () => {
      const resposta = await axios.get('http://localhost:3333/listarEmpresasSalvas')
      setLista(resposta.data?.dados || [])
    }
    carregar()
  }, [atualizarLista])

  async function criarEmpresa() {
    const resposta = await axios.post('http://localhost:3333/criarEmpresa', {
      cnpj: '66666666666666',
      nomeFantasia: 'Empresa do Nicholas',
      dataDeCriacao: new Date()
    })
    setAtualizarLista(!atualizarLista)
    alert(resposta.data.mensagem)

  }

  async function excluirEmpresa(cnpj) {
    const resposta = await axios.delete(`http://localhost:3333/excluirEmpresa/`+cnpj)
    setAtualizarLista(!atualizarLista)
    alert(resposta.data.mensagem)
  }

  return (
    <div>
      {
        lista.length === 0 ? <p>Não tem empresas salvas!</p> :
        lista.map((empresa, index) => {
          return (
            <div key={index}>
              <p>
                {empresa.nomeFantasia} - {empresa.cnpj} - {empresa.dataDeCriacao}
              </p>
              <button type="button" onClick={() => excluirEmpresa(empresa.cnpj)}>
                Excluir empresa
              </button>
            </div>
          )
        })
      }
      <button type="button" onClick={criarEmpresa}>Criar nova empresa</button>
    </div>
  );
}

export default App;
