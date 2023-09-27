import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3333"
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')

  if(accessToken) {
    config.headers["Authorization"] = accessToken
  }

  return config
})

api.interceptors.response.use(
  (response) => { return response },
  async(error) => {
    if(error.response.status === 401) {
      try {
        error.config._retry = true
        const refreshToken = localStorage.getItem("refreshToken")
        const response = await api.post("/api/newToken", {refreshToken})
        const { accessToken } = response.data
        localStorage.setItem('accessToken', accessToken)

        return api(error.config)
      } catch (err) {
        console.log("semana 09", err)
      }
    }
  }
)

export { api };