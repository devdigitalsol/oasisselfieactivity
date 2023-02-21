import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Selfie from "./Selfie";

const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="selfie" element={<Selfie />} />
    </Routes>
  );
};
export default App;
