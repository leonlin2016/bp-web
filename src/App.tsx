import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login"; // 新增：引入登录页
import Dashboard from "@/pages/Dashboard";
function App() {
  return (
    <Router>
      {/* 整个页面的容器，min-h-screen 保证至少占满一屏 */}
      <div className="min-h-screen flex flex-col font-sans">
        {/* 顶部导航栏 */}
        <Navbar />
        
        {/* 路由区域：根据网址变化显示不同页面 */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 以后可以在这里加更多页面，比如 /login, /dashboard */}
          <Route path="/login" element={<Login />} />
           {/* 新增：配置路径 */}
           <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
