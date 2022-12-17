import axios from "axios";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { API_KEY } from "./constantes";

axios.defaults.headers.common["Authorization"] = "Bearer " + API_KEY;

function App() {
  console.log("rerender AP");
  return (
    <div className="App">
      <h2 className="p-4 text-3xl font-bold">Monetisation Dashboard</h2>
      <Dashboard />
    </div>
  );
}

export default App;
