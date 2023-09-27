import { PrivateRoutes } from "./privateRoutes"
import { PublicRoutes } from "./publicRoutes"
import {useAuth} from "../hooks/useAuth"

function RoutesApp() {
  const {accessToken} = useAuth()

  if (accessToken) {
    return (
      <PrivateRoutes />
    )
  }

  return (
    <PublicRoutes />
  )
}

export { RoutesApp }