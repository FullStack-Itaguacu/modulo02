import { useContext } from "react"
import { AuthContext } from "../context/authContext"

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("Está fora do provedor")
  }

  return context
}

export { useAuth }