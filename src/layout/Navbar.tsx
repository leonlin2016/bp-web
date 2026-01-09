import { Button } from "@/components/ui/button";
import { Package2 } from "lucide-react"; // 一个简单的图标
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        {/* 左侧 Logo */}
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="flex items-center space-x-2">
            <Package2 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              BP-Web 产品名
            </span>
          </Link>
        </div>

        {/* 右侧按钮区 */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              文档
            </Button>
             {/* 修改这里：用 Link 包裹 Button，或者直接把 Button 当链接用 */}
            <Link to="/login">
              <Button size="sm">
                登录 / 注册
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
