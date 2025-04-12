import { Context } from "vm";
import MigrationRequestWorkspaceLayout from "../../../../../../../../layouts/migration-request-workspace";
import MigrationRequestTrackerContainer from "../../../../../../../../modules/migration-request-tracker/components";

function RequestTrackerPage({
  migrationRequestId,
  customerId,
}: {
  migrationRequestId: string;
  customerId: string;
}) {
  return (
    <div
      className="h-full bg-theme-background-primary"
      id="migration-request-conversation"
    >
      <MigrationRequestTrackerContainer
        migrationRequestId={migrationRequestId}
        customerId={customerId}
      />
    </div>
  );
}

RequestTrackerPage.getInitialProps = async (context: Context) => {
  const { query } = context;

  return {
    migrationRequestId: query.migrationrequestid,
    customerId: query.customerid,
  };
};

RequestTrackerPage.PageLayout = MigrationRequestWorkspaceLayout;
export default RequestTrackerPage;
