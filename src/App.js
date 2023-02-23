import { useEffect } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import Login from "./Login";
import Selfie from "./Selfie";

const App = () => {
  const isUserRoute = useMatch("/selfie");
  useEffect(() => {
    if (isUserRoute) {
      document.getElementById("root").classList.add("changeBg");
    } else {
      document.getElementById("root").classList.remove("changeBg");
    }
  }, [isUserRoute]);
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="selfie" element={<Selfie />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
