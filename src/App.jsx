// =====================================================
// Import
// =====================================================
// CSS ของ App Component
import "./App.css";

// React Router
// BrowserRouter : เปิดใช้งานระบบ Routing
// Routes        : รวม Route ทั้งหมด
// Route         : กำหนด URL กับ Component ที่จะแสดง
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Sonner
// Library สำหรับแสดง Notification (Toast)
import { Toaster } from "sonner";

// Components
// ส่วนประกอบต่าง ๆ ของหน้าเว็บไซต์
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ArticlesSection from "./components/ArticlesSection";
import ViewPost from "./components/ViewPost";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";

// =====================================================
// App Component
//
// Component หลักของเว็บไซต์
//
// หน้าที่
// 1. จัดการ React Router
// 2. แสดง Layout หลักของเว็บไซต์
// 3. แสดงแต่ละหน้าตาม URL
// 4. แสดง Toast Notification
// =====================================================

function App() {
  return (
    // =====================================================
    // BrowserRouter
    //
    // ใช้เปิดการทำงานของ React Router
    //
    // ทำให้สามารถเปลี่ยนหน้าเว็บไซต์
    // โดยไม่ต้อง Reload หน้าเว็บ
    // =====================================================

    <BrowserRouter>
      {/* =====================================================
      Layout หลักของเว็บไซต์

      ทุกหน้าจะมี

      - NavBar
      - Footer
      - Toaster

      ส่วนตรงกลางจะเปลี่ยนไปตาม Route
      ===================================================== */}

      <div className="flex min-h-screen flex-col bg-slate-50">
        {/* =====================================================
        Navigation Bar

        แสดงเมนูด้านบน

        ทุกหน้าจะใช้ร่วมกัน
        ===================================================== */}

        <NavBar />

        {/* =====================================================
        Main Content

        grow
        ทำให้ Content ขยายเต็มพื้นที่
        เพื่อดัน Footer ลงล่างเสมอ
        ===================================================== */}

        <main className="grow">
          {/* =====================================================
          Routes

          ใช้กำหนดว่า
          URL ไหน
          จะแสดง Component อะไร
          ===================================================== */}

          <Routes>
            {/* =====================================================
            Home Page
            URL
            /
            แสดง

            - HeroSection
            - ArticlesSection
            ===================================================== */}

            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <ArticlesSection />
                </>
              }
            />

            {/* =====================================================
            View Post

            URL

            /post/:postId

            :postId

            คือ Dynamic Route

            เช่น

            /post/1
            /post/8
            /post/15

            ViewPost จะนำ postId

            ไปเรียก API

            เพื่อโหลดบทความนั้น
            ===================================================== */}

            <Route path="/post/:postId" element={<ViewPost />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route
              path="/account"
              element={
                <div className="px-6 py-20 text-center">
                  {" "}
                  <h1 className="text-3xl font-semibold text-slate-950">
                    Your account
                  </h1>
                  <p className="mt-3 text-slate-600">
                    You are signed in successfully.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>

        {/* =====================================================
        Footer

        แสดงด้านล่างทุกหน้า
        ===================================================== */}

        <Footer />

        {/* =====================================================
        Toaster

        ใช้แสดง Notification

        เช่น

        - Copy Success
        - Error
        - Success Message

        position

        กำหนดตำแหน่งการแสดงผล
        ===================================================== */}

        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
