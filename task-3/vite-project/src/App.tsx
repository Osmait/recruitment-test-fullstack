import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";
import { BuggetProvider } from "./Context/BudgetProvider";
import { AuthLayout } from "./layout/AuthLayout";
import { RouteProtect } from "./layout/RouteProtect";

import { Index } from "./page/Index";
import { Login } from "./page/Login";
import { Registro } from "./page/Registro";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BuggetProvider>
          <Routes>
            <Route path="/login" element={<AuthLayout />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="/registrar" element={<Registro />} />

            <Route path="/" element={<RouteProtect />}>
              <Route index element={<Index />} />
            </Route>
          </Routes>
        </BuggetProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
