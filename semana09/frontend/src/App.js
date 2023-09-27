import { AuthProvider } from "./context/authContext";
import { RoutesApp } from "./routes";

function App() {
  return (
    <AuthProvider>
      <RoutesApp/>
    </AuthProvider>
  );
}

export default App;
