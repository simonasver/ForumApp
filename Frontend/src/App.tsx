import "./App.css";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";
import Footer from "./components/layout/Footer";
import { Route, Routes } from "react-router-dom";
import TextEditor from "./components/textEditor/TextEditor";
import LoginForm from "./components/auth/LoginForm";
import Content from "./components/layout/Content";
import RegisterForm from "./components/auth/RegisterForm";
import NotificationSnackbar from "./components/layout/NotificationSnackbar";
import LogoutPage from "./pages/LogoutPage";
import Profile from "./components/profile/Profile";
import AdminControlPanel from "./components/admin/AdminControlPanel";
import AdminCategories from "./components/admin/AdminCategories";

function App() {
  return (
    <>
      <NotificationSnackbar />
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<MainContent /* category="" */ />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/logout" element={<LogoutPage />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/admin" element={<AdminControlPanel />} />
          <Route path="/admincategory" element={<AdminCategories />} />

          <Route path="createPost" element={<TextEditor />} />
        </Routes>
      </Content>
      <Footer />
    </>
  );
}

export default App;
