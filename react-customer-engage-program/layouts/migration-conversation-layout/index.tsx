import NavigationBar from "../../modules/migration-request-tracker/components/navigation-bar";

function MigrationRequestConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen font-primary bg-theme-background-primary">
     <NavigationBar />
    </div>
  );
}

export default MigrationRequestConversationLayout;
