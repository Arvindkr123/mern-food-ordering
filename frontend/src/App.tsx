import { Navigate, Route, Routes } from "react-router-dom";
import Layout from './layouts/layout';
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

import UserProfile from "./pages/user-profile/UserProfile";
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
        <Route path="/user-profile" element={
          <Layout showHero={false}>
            <UserProfile />
          </Layout>} />

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  )
}