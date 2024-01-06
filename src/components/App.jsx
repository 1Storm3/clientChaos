import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./useAuth";

const App = () => (
  <div className="container">
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </div>
);

export default App;
