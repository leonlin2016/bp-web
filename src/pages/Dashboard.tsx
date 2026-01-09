import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Reading } from "@/types";

import AddReadingForm from "@/components/AddReadingForm";
import ReadingList from "@/components/ReadingList";
import TrendChart from "@/components/TrendChart"; // 引入图表
import AverageCard from "@/components/AverageCard";

export default function Dashboard() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取数据的逻辑移到了这里
  const fetchReadings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("readings")
        .select("*")
        .order("created_at", { ascending: false }); // 最新在前

      if (error) throw error;
      setReadings(data || []);
    } catch (error) {
      console.error("Error fetching readings:", error);
    } finally {
      setLoading(false);
    }
  };

  // 页面加载时获取一次
  useEffect(() => {
    fetchReadings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
     
      
      <main className="container max-w-lg mx-auto p-4 space-y-6">
         {/* 0. 概览卡片 (新增) */}
  <section>
    {!loading && <AverageCard data={readings} />}
  </section>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            控制台
          </h1>
          <p className="text-slate-500">
            保持监测，守护健康。
          </p>
        </div>

        {/* 1. 图表区域：把数据传给它 */}
        <section>
          {!loading && <TrendChart data={readings} />}
        </section>

        {/* 2. 录入区域：成功后重新获取数据 */}
        <section>
          <AddReadingForm onSuccess={fetchReadings} />
        </section>

        {/* 3. 列表区域：把数据传给它，删除成功也重新获取 */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-slate-700">历史记录</h2>
          {loading ? (
            <div className="text-center text-slate-400">加载中...</div>
          ) : (
            <ReadingList data={readings} onDeleteSuccess={fetchReadings} />
          )}
        </section>
      </main>
    </div>
  );
}
