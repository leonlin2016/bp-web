import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                构建你的下一个伟大产品
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                这是一个基于 React + Vite + Tailwind + Shadcn UI 的完美起步模板。
                专注于业务，而不是繁琐的配置。
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg">开始使用</Button>
              <Button variant="outline" size="lg">了解更多</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
