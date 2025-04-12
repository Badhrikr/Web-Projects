import { Context } from "vm";
import MigrationRequestWorkspaceLayout from "../../../../../../../../layouts/migration-request-workspace";
import CalendarContainer from "../../../../../../../../modules/migration-request-workspace/components/calendar";

function CalendarPage({
  migrationRequestId,
}: {
  migrationRequestId: string;
  customerId: string;
}) {
  return (
    <div
      className="h-full bg-theme-background-primary"
      id="migration-request-conversation"
    >
      <h3 className="text-xl text-theme-secondary font-secondary font-semibold my-4">Calendar</h3>
      <CalendarContainer migrationRequestId={migrationRequestId} />
    </div>
  );
}

CalendarPage.getInitialProps = async (context: Context) => {
  const { query } = context;

  return {
    migrationRequestId: query.migrationrequestid,
    customerId: query.customerid,
  };
};

CalendarPage.PageLayout = MigrationRequestWorkspaceLayout;
export default CalendarPage;
