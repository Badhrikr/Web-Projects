import { Context } from "vm";
import CustomerWorkspaceLayout from "../../../../../../layouts/customer-workspace-layout";
import CalendarContainer from "../../../../../../modules/customer-workspace/components/calendar";

function CustomerCalendarPage({ customerId }: { customerId: string }) {
  return (
    <div className="text-theme-secondary">
      <CalendarContainer customerId={customerId} />
    </div>
  );
}

CustomerCalendarPage.getInitialProps = async (context: Context) => {
  const { query } = context;
  return {
    customerId: query.customerid,
  };
};

CustomerCalendarPage.PageLayout = CustomerWorkspaceLayout;
export default CustomerCalendarPage;
