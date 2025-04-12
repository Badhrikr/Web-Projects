import Topbar from "../../modules/home/components/topbar";

function CompleteRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen font-primary bg-theme-background-primary">
      <Topbar />

      <main className="flex-1 flex flex-col px-5 py-4 overflow-y-auto justify-center">
        {children}
      </main>
    </div>
  );
}

export default CompleteRegistrationLayout;
