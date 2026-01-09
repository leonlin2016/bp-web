import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusCircle } from "lucide-react";

// 定义组件接收一个 props：onSuccess
// 这样当保存成功后，我们可以通知父组件刷新列表
interface Props {
  onSuccess?: () => void;
}

export default function AddReadingForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("请先登录");

      const { error } = await supabase.from("readings").insert({
        user_id: user.id,
        systolic: parseInt(systolic),
        diastolic: parseInt(diastolic),
        pulse: pulse ? parseInt(pulse) : null,
      });

      if (error) throw error;

      // 清空表单
      setSystolic("");
      setDiastolic("");
      setPulse("");
      
      // 通知父组件（如果有的话）
      if (onSuccess) onSuccess();
      
      alert("记录保存成功！"); // 暂时用 alert，后面我们换成更优雅的 Toast
      
    } catch (error: any) {
      alert("保存失败: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-teal-600" />
          记录新数据
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* 高压 */}
            <div className="space-y-2">
              <Label htmlFor="sys" className="text-xs text-slate-500">收缩压 (高)</Label>
              <Input
                id="sys"
                placeholder="120"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                type="number"
                inputMode="numeric" 
                required
                className="text-lg font-semibold"
              />
            </div>

            {/* 低压 */}
            <div className="space-y-2">
              <Label htmlFor="dia" className="text-xs text-slate-500">舒张压 (低)</Label>
              <Input
                id="dia"
                placeholder="80"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                type="number"
                inputMode="numeric"
                required
                className="text-lg font-semibold"
              />
            </div>

            {/* 脉搏 */}
            <div className="space-y-2">
              <Label htmlFor="pulse" className="text-xs text-slate-500">脉搏 (选填)</Label>
              <Input
                id="pulse"
                placeholder="75"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                type="number"
                inputMode="numeric"
                className="text-lg font-semibold"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "保存记录"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
