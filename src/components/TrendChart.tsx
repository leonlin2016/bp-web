import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Reading } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface Props {
  data: Reading[];
}

export default function TrendChart({ data }: Props) {
  // 1. 数据预处理
  // 数据库出来的数据是“从新到旧”，但图表通常是从左(旧)到右(新)
  // 我们只取最近的 7 次记录来展示，避免手机屏幕太挤
  const chartData = [...data]
    .reverse() // 翻转数组
    .slice(-7) // 取最后7个（也就是原本最新的7个）
    .map((item) => ({
      ...item,
      // 格式化日期为 "10/24" 这种短格式
      date: new Date(item.created_at).toLocaleDateString("zh-CN", {
        month: "numeric",
        day: "numeric",
      }),
    }));

  if (data.length < 2) {
    return null; // 数据太少画不出线，直接不显示
  }

  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-600" />
          最近趋势
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                domain={[60, 180]} // 设定Y轴大概范围，避免线条太扁
                hide // 手机上隐藏Y轴数字，省空间
              />
              <Tooltip />
              {/* 高压线 - 蓝绿色 */}
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#0d9488"
                strokeWidth={3}
                dot={{ r: 4, fill: "#0d9488" }}
              />
              {/* 低压线 - 紫色 */}
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ r: 4, fill: "#7c3aed" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 text-sm mt-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-teal-600"></div>
            <span>收缩压</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-violet-600"></div>
            <span>舒张压</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
