import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Components/Todo";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
