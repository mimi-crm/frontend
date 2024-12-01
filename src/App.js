import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AxiosProvider } from "./context/AxiosContext";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import DashboardPage from "./components/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import CustomerListPage from "./components/CustomerListPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
         <AxiosProvider>
            <Routes>
              <Route path="" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/dashboard"
                element={
                  <PrivateRoute>
                    <Layout>
                      <DashboardPage />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/customers"
                element={
                  <PrivateRoute>
                    <Layout>
                      <CustomerListPage />
                    </Layout>
                  </PrivateRoute>
                }
              />
            </Routes>
         </AxiosProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
