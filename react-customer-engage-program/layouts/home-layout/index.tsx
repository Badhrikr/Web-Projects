import Navbar from "../../modules/home/components/navbar";
import Topbar from "../../modules/home/components/topbar";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen font-primary bg-theme-background-primary">
      <Topbar />
      <Navbar />

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export default HomeLayout;
