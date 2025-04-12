import { Context } from "vm";
import Navbar from "../../modules/home/components/navbar";
import Topbar from "../../modules/home/components/topbar";
import MigrationRequestSidebarMenu from "../../modules/migration-request-workspace/components/sidebar-menu";

function MigrationRequestWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen font-primary bg-theme-background-primary">
      <Topbar />
      <Navbar />

      <div className="flex-1 overflow-auto flex gap-3 p-2">
        <div className="bg-theme-background-elevate">
          <MigrationRequestSidebarMenu />
        </div>
        <main className="max-h-full flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

MigrationRequestWorkspaceLayout.getInitialProps = async (context: Context) => {
  const { query } = context;

  return {
    customerId: query.customerid,
  };
};

export default MigrationRequestWorkspaceLayout;
