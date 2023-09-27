import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"
function Login() {
  const { login } = useAuth()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const email = event.target.elements["email"].value
      const password = event.target.elements["password"].value
      const response = await api.post('/api/session', { email, password })
      login(response.data.accessToken, response.data.refreshToken)
      console.log(response)
    } catch (error) {
      alert('Falhou a requisição')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="E-mail" name="email" />
      <input placeholder="Senha" name="password" />
      <input type="submit" />
    </form>
  )
}

export { Login }