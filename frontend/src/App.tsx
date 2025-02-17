import { Navigate, Route, Routes } from "react-router-dom";
import Layout from './layouts/layout';
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />

        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/user-profile" element={
          <Layout>
            <span>USERS PROFILE PAGE</span>
          </Layout>} />

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  )
}