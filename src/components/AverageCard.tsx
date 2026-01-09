import { Reading } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

// 关键修复：这里定义了 Props 接口，并使用了 Reading 类型
interface Props {
  data: Reading[];
}

export default function AverageCard({ data }: Props) {
  if (data.length === 0) return null;

  // 计算平均值
  const total = data.reduce(
    (acc, cur) => ({
      sys: acc.sys + cur.systolic,
      dia: acc.dia + cur.diastolic,
    }),
    { sys: 0, dia: 0 }
  );

  const avgSys = Math.round(total.sys / data.length);
  const avgDia = Math.round(total.dia / data.length);

  // 判断状态
  const isHigh = avgSys >= 140 || avgDia >= 90;
  
  const statusColor = isHigh ? "text-red-500" : "text-emerald-500";
  const statusText = isHigh ? "偏高" : "正常";

  return (
    <Card className="bg-slate-900 text-white border-none shadow-lg mb-6">
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">平均血压 (最近{data.length}次)</p>
          <div className="text-3xl font-bold tracking-tight">
            {avgSys} <span className="text-slate-500 text-xl">/</span> {avgDia}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${statusColor}`}>
            {statusText}
          </div>
          <p className="text-xs text-slate-500 mt-1">mmHg</p>
        </div>
      </CardContent>
    </Card>
  );
}
