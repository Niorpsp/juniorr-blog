import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ArticlesSection from "./components/ArticlesSection";
import ViewPost from "./components/ViewPost";
import Footer from "./components/Footer";
import HealthTestPage from "./pages/HealthTestPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <NavBar />
        <div className="grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <ArticlesSection />
                </>
              }
            />
            <Route path="/post/:postId" element={<ViewPost />} />
            <Route path="/test-health" element={<HealthTestPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
