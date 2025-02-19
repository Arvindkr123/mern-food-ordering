import { Navigate, Route, Routes } from "react-router-dom";
import Layout from './layouts/layout';
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

import UserProfile from "./pages/user-profile/UserProfile";
import ManageRestarant from "./pages/user-profile/ManageRestarant";
import ProtectRoutes from "./auth/ProtectRoutes";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        } />

        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<ProtectRoutes />}>
          <Route path="/user-profile" element={
            <Layout showHero={false}>
              <UserProfile />
            </Layout>} />

          <Route path="/manage-restaurant" element={
            <Layout showHero={false}>
              <ManageRestarant />
            </Layout>} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  )
}