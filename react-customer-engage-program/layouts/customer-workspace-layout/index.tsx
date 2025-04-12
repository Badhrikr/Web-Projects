import CustomerSidebarMenu from "../../modules/customer-workspace/components/sidebar-menu";
import Navbar from "../../modules/home/components/navbar";
import Topbar from "../../modules/home/components/topbar";

function CustomerWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen font-primary bg-theme-background-primary">
      <Topbar />
      <Navbar />

      <div className="flex-1 overflow-auto flex gap-3 p-2">
        <div className="bg-theme-background-elevate">
          <CustomerSidebarMenu />
        </div>
        <main className="max-h-full flex-1 overflow-auto ">{children}</main>
      </div>
    </div>
  );
}

export default CustomerWorkspaceLayout;
