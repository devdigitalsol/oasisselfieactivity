import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Selfie from "./Selfie";

const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="selfie" element={<Selfie />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
