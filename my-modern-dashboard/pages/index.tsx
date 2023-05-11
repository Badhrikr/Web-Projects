import SideBar from "@/modules/dashboard/components/sidebar";
import StickyBar from "@/modules/dashboard/components/stickybar";
import ComplexTable from "@/modules/dashboard/components/complextable";
import TopBar from "@/modules/dashboard/components/topbar";
import CheckTable from "@/modules/dashboard/components/checktable";
import TaskChecker from "@/modules/dashboard/components/taskschecker";
import Calendar from "@/modules/dashboard/components/calendar";
import StatsCards from "@/modules/dashboard/components/statscards";
import StatsPieChart from "@/modules/dashboard/components/statspiechart";
import StatsBarChart from "@/modules/dashboard/components/statsbarchart";
import WeeklyRevenue from "@/modules/dashboard/components/weekly-revenue";
import MonthlyGraph from "@/modules/dashboard/components/monthly-graph";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="flex items-stretch justify-start">
        <SideBar />
        <div className="flex flex-col w-full gap-4 p-8">
          <StickyBar />
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
            <StatsCards />
            <MonthlyGraph />
            <WeeklyRevenue />
            <CheckTable />
            <StatsBarChart />
            <StatsPieChart />
            <ComplexTable />
            <TaskChecker />
            <Calendar />

            {/* <div className="h-screen bg-black w-96"></div> */}
          </div>
        </div>
      </div>
    </>
  );
}
