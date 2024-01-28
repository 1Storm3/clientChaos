import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./useAuth";

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
