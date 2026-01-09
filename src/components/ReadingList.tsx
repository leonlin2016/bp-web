import { supabase } from "@/lib/supabase";
import { Reading } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

// 新增：定义 props，接收数据和刷新函数
interface Props {
  data: Reading[];
  onDeleteSuccess: () => void; // 删除成功后通知父组件
}

export default function ReadingList({ data, onDeleteSuccess }: Props) {
  
  // 删除函数
  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这条记录吗？")) return;

    try {
      const { error } = await supabase.from("readings").delete().eq("id", id);
      if (error) throw error;
      
      // 成功后，通知父组件刷新
      onDeleteSuccess();
    } catch (error) {
      alert("删除失败");
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("zh-CN", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const isHigh = (sys: number, dia: number) => sys >= 140 || dia >= 90;

  if (data.length === 0) {
    return <div className="text-center py-10 text-slate-400">还没有记录，快去测一次吧！</div>;
  }

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${isHigh(item.systolic, item.diastolic) ? "text-red-500" : "text-slate-900"}`}>
                  {item.systolic}/{item.diastolic}
                </span>
                <span className="text-sm text-slate-500">mmHg</span>
              </div>
              <div className="text-xs text-slate-400 flex gap-2">
                <span>{formatDate(item.created_at)}</span>
                {item.pulse && <span>❤️ {item.pulse}</span>}
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-300 hover:text-red-500 hover:bg-red-50"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
