import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Bot from "./pages/bot";
import Worker from "./pages/worker";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bots/:id" element={<Bot />} />
      <Route path="/bots/:botId/:workerId" element={<Worker />} />
    </Routes>
  );
}

export default App;
